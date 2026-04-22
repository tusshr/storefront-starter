"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  alt: string;
};

export function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted">
        <Image
          src={main}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <ul role="list" className="flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                aria-label={`Show image ${i + 1}`}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "relative block size-16 overflow-hidden rounded-md border bg-muted transition-colors",
                  i === active
                    ? "border-foreground ring-2 ring-ring/30"
                    : "border-border hover:border-foreground/40"
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
