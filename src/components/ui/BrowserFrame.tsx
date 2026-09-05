import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Wraps a real product screenshot in minimal browser chrome. Showing the
 * actual working UI is a stronger credibility signal for this audience
 * than stock photography of Dutch landmarks.
 */
export function BrowserFrame({
  src,
  alt,
  label = "integreernl.nl",
  priority = false,
  className,
  width = 1280,
  height = 820,
}: {
  src: string;
  alt: string;
  label?: string;
  priority?: boolean;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-ink-200/70 bg-canvas-raised shadow-lg",
        className
      )}
    >
      {/* chrome */}
      <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50/60 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        </span>
        <span className="mx-auto rounded-full bg-canvas-raised px-3 py-0.5 text-2xs text-body-subtle">
          {label}
        </span>
      </div>

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes="(min-width: 1024px) 640px, 100vw"
        className="w-full"
      />
    </div>
  );
}
