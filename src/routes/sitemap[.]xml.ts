import { createFileRoute } from "@tanstack/react-router";

const STATIC_PATHS = [
  "/",
  "/packages",
  "/services",
  "/umrah-guide",
  "/about",
  "/faq",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/refund-and-cancellation-policy",
  "/disclaimer",
];

/**
 * Sitemap generated from the live routes plus the published packages in the
 * database. The base URL is taken from the request, so it is always correct
 * for whichever domain is serving the site. No <lastmod> is emitted because
 * there is no authoritative per-page change timestamp.
 */
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const paths = [...STATIC_PATHS];

        const url = process.env['SUPABASE_URL'];
        const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
        if (url && key) {
          try {
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
            const { data } = await supabase
              .from("packages")
              .select("slug")
              .eq("published", true)
              .order("sort_order")
              .range(0, 999);
            for (const row of data ?? []) {
              if (typeof row.slug === "string") paths.push(`/packages/${row.slug}`);
            }
          } catch (error) {
            console.error("Sitemap: could not read packages", error);
          }
        }

        if (paths.length === STATIC_PATHS.length) {
          const { PACKAGES } = await import("@/data/packages");
          for (const p of PACKAGES) paths.push(`/packages/${p.slug}`);
        }

        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...new Set(paths)]
  .map((path) => `  <url><loc>${origin}${path}</loc></url>`)
  .join("\n")}
</urlset>
`;

        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
