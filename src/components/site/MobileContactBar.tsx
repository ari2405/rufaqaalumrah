import { MessageCircle, Phone } from "lucide-react";

import { SITE, telLink, whatsappLink } from "@/lib/site";

/** Sticky call + WhatsApp bar shown on small screens only. */
export function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-border bg-background/95 backdrop-blur lg:hidden">
      <a
        href={telLink}
        className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-foreground"
        aria-label={`Call ${SITE.phoneDisplay}`}
      >
        <Phone className="size-4 text-primary" aria-hidden="true" />
        Call Now
      </a>
      <a
        href={whatsappLink(
          "Assalamu alaikum NoorSafar Umrah, I would like to enquire about your Umrah packages.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-primary py-3.5 text-sm font-semibold text-primary-foreground"
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}
