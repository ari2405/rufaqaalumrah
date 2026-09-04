import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone, Send } from "lucide-react";

import { DEFAULT_WHATSAPP_MESSAGE, SITE, telLink, whatsappLink } from "@/lib/site";

/** Sticky Call / WhatsApp / Enquire bar — small screens only. */
export function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-border bg-background/95 text-sm font-semibold backdrop-blur lg:hidden">
      <a
        href={telLink}
        className="flex items-center justify-center gap-2 py-3.5 text-foreground"
        aria-label={`Call ${SITE.phoneDisplay}`}
      >
        <Phone className="size-4 text-primary" aria-hidden="true" />
        Call
      </a>
      <a
        href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 border-x border-border py-3.5 text-foreground"
      >
        <MessageCircle className="size-4 text-primary" aria-hidden="true" />
        WhatsApp
      </a>
      <Link
        to="/contact"
        className="flex items-center justify-center gap-2 bg-primary py-3.5 text-primary-foreground"
      >
        <Send className="size-4" aria-hidden="true" />
        Enquire
      </Link>
    </div>
  );
}
