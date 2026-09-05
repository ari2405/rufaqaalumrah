import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";

import type { SiteData } from "@/lib/content";

/**
 * Public, read-only content feed for the website.
 * Uses the publishable key, so Row Level Security applies exactly as it does
 * for an anonymous visitor: only published rows are ever returned.
 */
export const getSiteData = createServerFn({ method: "GET" }).handler(async (): Promise<SiteData> => {
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) {
    return { settings: [], packages: [], services: [], faqs: [], testimonials: [] };
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });

  const [settings, packages, services, faqs, testimonials] = await Promise.all([
    supabase.from("site_settings").select("key, value"),
    supabase.from("packages").select("*").eq("published", true).order("sort_order"),
    supabase.from("services").select("*").eq("published", true).order("sort_order"),
    supabase.from("faqs").select("*").eq("published", true).order("sort_order"),
    supabase.from("testimonials").select("*").eq("published", true).order("sort_order"),
  ]);

  return {
    settings: (settings.data ?? []) as SiteData["settings"],
    packages: (packages.data ?? []) as SiteData["packages"],
    services: (services.data ?? []) as SiteData["services"],
    faqs: (faqs.data ?? []) as SiteData["faqs"],
    testimonials: (testimonials.data ?? []) as SiteData["testimonials"],
  };
});

export const siteDataQuery = queryOptions({
  queryKey: ["site-data"],
  queryFn: () => getSiteData(),
  staleTime: 60_000,
});
