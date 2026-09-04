import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "deep";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20",
        tone === "muted" && "bg-secondary/40",
        tone === "deep" && "bg-primary text-primary-foreground",
        className,
      )}
    >
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
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  invert?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.24em]",
            invert ? "text-accent" : "text-accent-foreground",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={cn(
          "mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl",
          invert ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            invert ? "text-primary-foreground/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Reusable, lazy, responsive image frame.
 * Replace the `src` with any import from src/assets — sizing stays consistent.
 */
export function ImageFrame({
  src,
  alt,
  width,
  height,
  className,
  ratio = "aspect-[4/3]",
  priority = false,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  ratio?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-secondary/60", ratio, className)}>
      <img
        src={src}
        alt={alt}
        {...(width ? { width } : {})}
        {...(height ? { height } : {})}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="size-full object-cover"
      />
    </div>
  );
}
