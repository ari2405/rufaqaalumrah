import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { SERVICES, FAQS, TESTIMONIALS } from "@/config/content";
import { PACKAGES } from "@/data/packages";

const EDITABLE_TABLES = ["packages", "services", "faqs", "testimonials", "whatsapp_templates"] as const;
type EditableTable = (typeof EDITABLE_TABLES)[number];

type Ctx = { supabase: any; userId: string };

async function assertAdmin(context: Ctx): Promise<void> {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error("Could not verify your access level.");
  if (data !== true) throw new Error("Forbidden: this area is for administrators.");
}

/** Tells the dashboard whether the signed-in user is an admin, and whether an admin exists at all. */
export const getAccessState = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [{ data: isAdmin }, { count }] = await Promise.all([
      context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" }),
      supabaseAdmin.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "admin"),
    ]);
    return { isAdmin: isAdmin === true, adminExists: (count ?? 0) > 0, userId: context.userId };
  });

/**
 * First-run setup: the very first signed-in account can claim the admin role,
 * but only while no administrator exists yet.
 */
export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) > 0) throw new Error("An administrator already exists for this site.");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getAdminData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as Ctx);
    const { whatsappSetup } = await import("@/lib/whatsapp.server");
    const sb = context.supabase;
    const [settings, packages, services, faqs, testimonials, templates, leads] = await Promise.all([
      sb.from("site_settings").select("key, value"),
      sb.from("packages").select("*").order("sort_order"),
      sb.from("services").select("*").order("sort_order"),
      sb.from("faqs").select("*").order("sort_order"),
      sb.from("testimonials").select("*").order("sort_order"),
      sb.from("whatsapp_templates").select("*").order("key"),
      sb.from("leads").select("*").order("created_at", { ascending: false }).limit(500),
    ]);

    return {
      settings: settings.data ?? [],
      packages: packages.data ?? [],
      services: services.data ?? [],
      faqs: faqs.data ?? [],
      testimonials: testimonials.data ?? [],
      templates: templates.data ?? [],
      leads: leads.data ?? [],
      whatsapp: whatsappSetup(),
    };
  });

export const saveSetting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ key: z.enum(["business", "images"]), value: z.record(z.string(), z.unknown()) }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { error } = await context.supabase
      .from("site_settings")
      .upsert({ key: data.key, value: data.value, updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const saveRow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        table: z.enum(EDITABLE_TABLES),
        id: z.string().uuid().optional(),
        values: z.record(z.string(), z.unknown()),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const table = data.table as EditableTable;
    const payload = { ...data.values, updated_at: new Date().toISOString() };
    if (data.id) {
      const { error } = await context.supabase.from(table).update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true, id: data.id };
    }
    const { data: inserted, error } = await context.supabase
      .from(table)
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true, id: inserted?.id as string };
  });

export const deleteRow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ table: z.enum(EDITABLE_TABLES), id: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { error } = await context.supabase.from(data.table).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updateLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["new", "contacted", "quoted", "booked", "closed"]),
        internalNotes: z.string().max(4000),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { error } = await context.supabase
      .from("leads")
      .update({
        status: data.status,
        internal_notes: data.internalNotes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Re-attempts the WhatsApp follow-up for one lead. Opt-in is re-checked server-side. */
export const retryLeadWhatsApp = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ leadId: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { sendLeadWhatsApp, recordOutcome } = await import("@/lib/whatsapp.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: lead } = await supabaseAdmin.from("leads").select("*").eq("id", data.leadId).single();
    if (!lead) throw new Error("Lead not found.");

    const { data: template } = await supabaseAdmin
      .from("whatsapp_templates")
      .select("*")
      .eq("key", "enquiry_confirmation")
      .eq("active", true)
      .maybeSingle();

    const { data: setting } = await supabaseAdmin
      .from("site_settings")
      .select("value")
      .eq("key", "business")
      .maybeSingle();
    const packagesUrl =
      ((setting?.value as Record<string, unknown> | null)?.['packagesUrl'] as string) || "/packages";

    const outcome = await sendLeadWhatsApp({ lead: lead as never, template: template as never, packagesUrl });
    await recordOutcome(supabaseAdmin as never, data.leadId, outcome);
    return outcome;
  });

/** Loads the site's built-in starter content into the database so it can be edited. */
export const importStarterContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ section: z.enum(["packages", "services", "faqs", "testimonials"]) }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const sb = context.supabase;

    if (data.section === "packages") {
      const rows = PACKAGES.map((p, i) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        nights: p.nights,
        makkah_nights: p.makkahNights,
        madinah_nights: p.madinahNights,
        hotel_stars: p.hotelStars,
        price_from: p.priceFrom,
        departure_cities: p.departureCities,
        months: p.months,
        image_url: "",
        image_alt: `${p.title} — illustrative image`,
        summary: p.summary,
        highlights: p.highlights,
        inclusions: p.inclusions,
        exclusions: p.exclusions,
        itinerary: p.itinerary,
        hotels: p.hotels,
        sort_order: i,
        published: true,
      }));
      const { error } = await sb.from("packages").upsert(rows, { onConflict: "slug" });
      if (error) throw new Error(error.message);
      return { ok: true, count: rows.length };
    }

    if (data.section === "services") {
      const { count } = await sb.from("services").select("id", { count: "exact", head: true });
      if ((count ?? 0) > 0) throw new Error("Services already exist — delete them first to re-import.");
      const { error } = await sb
        .from("services")
        .insert(SERVICES.map((s, i) => ({ ...s, sort_order: i, published: true })));
      if (error) throw new Error(error.message);
      return { ok: true, count: SERVICES.length };
    }

    if (data.section === "faqs") {
      const { count } = await sb.from("faqs").select("id", { count: "exact", head: true });
      if ((count ?? 0) > 0) throw new Error("FAQs already exist — delete them first to re-import.");
      const { error } = await sb
        .from("faqs")
        .insert(FAQS.map((f, i) => ({ ...f, sort_order: i, published: true })));
      if (error) throw new Error(error.message);
      return { ok: true, count: FAQS.length };
    }

    const { count } = await sb.from("testimonials").select("id", { count: "exact", head: true });
    if ((count ?? 0) > 0) throw new Error("Testimonials already exist — delete them first to re-import.");
    const { error } = await sb
      .from("testimonials")
      .insert(TESTIMONIALS.map((t, i) => ({ ...t, sort_order: i, published: false })));
    if (error) throw new Error(error.message);
    return { ok: true, count: TESTIMONIALS.length };
  });
