import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(20),
  email: z.string().trim().max(160).optional().default(""),
  departureCity: z.string().trim().max(60).optional().default(""),
  travelDate: z.string().trim().max(40).optional().default(""),
  pilgrims: z.string().trim().max(4).optional().default(""),
  duration: z.string().trim().max(40).optional().default(""),
  packageType: z.string().trim().max(40).optional().default(""),
  packageSlug: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().max(1000).optional().default(""),
  sourceForm: z.string().trim().max(40).optional().default("contact"),
  consent: z.boolean().optional().default(false),
  consentText: z.string().trim().max(600).optional().default(""),
  consentVersion: z.string().trim().max(40).optional().default(""),
});

/**
 * Public enquiry endpoint. Stores the lead in the CRM.
 * WhatsApp automation is only queued when the visitor ticked the opt-in box —
 * this is enforced here on the server, not in the browser.
 */
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const pilgrims = data.pilgrims ? Number.parseInt(data.pilgrims, 10) : null;

    const { error } = await supabaseAdmin.from("leads").insert({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      departure_city: data.departureCity || null,
      travel_date: data.travelDate || null,
      pilgrims: Number.isFinite(pilgrims) ? pilgrims : null,
      duration: data.duration || null,
      package_type: data.packageType || null,
      package_slug: data.packageSlug || null,
      message: data.message || null,
      source_form: data.sourceForm || "contact",
      whatsapp_optin: data.consent === true,
      consent_text: data.consent ? data.consentText : null,
      consent_version: data.consent ? data.consentVersion : null,
      consent_at: data.consent ? new Date().toISOString() : null,
      // Automated follow-up waits for an approved provider template; without
      // opt-in it is never queued at all.
      whatsapp_status: data.consent ? "pending" : "not_applicable",
    });

    if (error) {
      console.error("Failed to store lead", error.message);
      throw new Error("Could not store enquiry");
    }

    return { ok: true };
  });
