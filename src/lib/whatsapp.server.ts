/**
 * WhatsApp Business (Meta Cloud API) send layer — SERVER ONLY.
 *
 * Compliance rules enforced here, never in the browser:
 *  - a message is only ever queued or sent for a lead with a recorded opt-in;
 *  - a template is only used when it is marked active AND recorded as approved
 *    by the WhatsApp Business provider. Nothing here claims approval on its own;
 *  - without provider credentials nothing is sent and the lead stays "pending"
 *    with a readable reason stored against it.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

export type WhatsAppSetup = {
  configured: boolean;
  provider: "Meta WhatsApp Cloud API";
  missing: string[];
};

export function whatsappSetup(): WhatsAppSetup {
  const missing: string[] = [];
  if (!process.env['WHATSAPP_PHONE_NUMBER_ID']) missing.push("WHATSAPP_PHONE_NUMBER_ID");
  if (!process.env['WHATSAPP_ACCESS_TOKEN']) missing.push("WHATSAPP_ACCESS_TOKEN");
  return { configured: missing.length === 0, provider: "Meta WhatsApp Cloud API", missing };
}

export type LeadLike = {
  id: string;
  name: string;
  phone: string;
  departure_city: string | null;
  travel_date: string | null;
  pilgrims: number | null;
  duration: string | null;
  package_type: string | null;
  whatsapp_optin: boolean;
};

export type TemplateLike = {
  key: string;
  body: string;
  variables: string[];
  provider_template_name: string;
  language_code: string;
  approval_status: string;
  active: boolean;
};

/** Values available to every template placeholder. */
export function templateValues(lead: LeadLike, packagesUrl: string): Record<string, string> {
  return {
    name: lead.name,
    departure_city: lead.departure_city || "your city",
    travel_date: lead.travel_date || "your preferred dates",
    pilgrims: lead.pilgrims ? String(lead.pilgrims) : "your group",
    duration: lead.duration || "a duration that suits you",
    package_type: lead.package_type || "an Umrah package",
    packages_url: packagesUrl,
  };
}

export function renderTemplate(body: string, values: Record<string, string>): string {
  return body.replace(/\{\{\s*([a-z_]+)\s*\}\}/gi, (_m, key: string) => values[key.toLowerCase()] ?? "");
}

/** Digits-only E.164-ish number. Indian numbers without a country code get 91. */
export function normalisePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  return digits.replace(/^0+/, "");
}

export type SendOutcome = {
  status: "sent" | "pending" | "failed" | "not_applicable";
  error: string | null;
  providerMessageId: string | null;
  templateKey: string | null;
  preview: string | null;
};

export async function sendLeadWhatsApp(opts: {
  lead: LeadLike;
  template: TemplateLike | null;
  packagesUrl: string;
}): Promise<SendOutcome> {
  const { lead, template, packagesUrl } = opts;

  if (!lead.whatsapp_optin) {
    return {
      status: "not_applicable",
      error: "No WhatsApp opt-in recorded for this lead.",
      providerMessageId: null,
      templateKey: null,
      preview: null,
    };
  }

  const values = templateValues(lead, packagesUrl);
  const preview = template ? renderTemplate(template.body, values) : null;

  if (!template) {
    return {
      status: "pending",
      error: "No active template available for this message.",
      providerMessageId: null,
      templateKey: null,
      preview,
    };
  }

  if (template.approval_status !== "approved") {
    return {
      status: "pending",
      error: `Template "${template.key}" has not been approved by the WhatsApp Business provider yet, so nothing was sent.`,
      providerMessageId: null,
      templateKey: template.key,
      preview,
    };
  }

  const setup = whatsappSetup();
  if (!setup.configured) {
    return {
      status: "pending",
      error: `WhatsApp provider is not configured yet (missing: ${setup.missing.join(", ")}). Nothing was sent.`,
      providerMessageId: null,
      templateKey: template.key,
      preview,
    };
  }

  const version = process.env['WHATSAPP_API_VERSION'] || "v21.0";
  const phoneNumberId = process.env['WHATSAPP_PHONE_NUMBER_ID'];
  const token = process.env['WHATSAPP_ACCESS_TOKEN'];

  try {
    const response = await fetch(`https://graph.facebook.com/${version}/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: normalisePhone(lead.phone),
        type: "template",
        template: {
          name: template.provider_template_name || template.key,
          language: { code: template.language_code || "en" },
          components: [
            {
              type: "body",
              parameters: template.variables.map((variable) => ({
                type: "text",
                text: values[variable] ?? "",
              })),
            },
          ],
        },
      }),
    });

    const payload = (await response.json().catch(() => ({}))) as {
      messages?: { id?: string }[];
      error?: { message?: string };
    };

    if (!response.ok) {
      return {
        status: "failed",
        error: payload.error?.message ?? `Provider responded with ${response.status}.`,
        providerMessageId: null,
        templateKey: template.key,
        preview,
      };
    }

    return {
      status: "sent",
      error: null,
      providerMessageId: payload.messages?.[0]?.id ?? null,
      templateKey: template.key,
      preview,
    };
  } catch (error) {
    return {
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown provider error.",
      providerMessageId: null,
      templateKey: template.key,
      preview,
    };
  }
}

/** Writes the outcome of an attempt onto the lead row. */
export async function recordOutcome(
  client: SupabaseClient<any, any, any>,
  leadId: string,
  outcome: SendOutcome,
): Promise<void> {
  await client
    .from("leads")
    .update({
      whatsapp_status: outcome.status,
      whatsapp_error: outcome.error,
      whatsapp_template_key: outcome.templateKey,
      whatsapp_provider_message_id: outcome.providerMessageId,
      whatsapp_last_attempt_at: new Date().toISOString(),
    })
    .eq("id", leadId);
}
