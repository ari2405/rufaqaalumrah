import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  muted = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  muted?: boolean;
}) {
  return (
    <section id={id} className={cn(muted && "bg-secondary/40", "py-16 sm:py-20", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-foreground">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

/**
 * Drop-in image frame. Replace `src` with any import from src/assets —
 * the aspect ratio and styling stay consistent everywhere it is used.
 */
export function ImageFrame({
  src,
  alt,
  className,
  ratio = "aspect-[4/3]",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-secondary", ratio, className)}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="size-full object-cover"
      />
    </div>
  );
}
