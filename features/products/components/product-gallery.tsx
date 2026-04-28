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
    <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
      {images.length > 1 && (
        <ul
          role="list"
          className="order-2 flex gap-2 overflow-x-auto lg:order-1 lg:w-20 lg:flex-col lg:overflow-y-auto"
        >
          {images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                aria-label={`Show image ${i + 1}`}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "bg-card relative block size-16 overflow-hidden rounded-lg border transition-all sm:size-18 lg:size-20",
                  i === active
                    ? "border-foreground ring-ring/30 ring-2"
                    : "border-border hover:border-foreground/40"
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="border-border bg-card relative order-1 aspect-square w-full min-w-0 overflow-hidden rounded-xl border lg:order-2 lg:max-w-136">
        <Image
          src={main}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 34rem, (min-width: 1024px) 42vw, 100vw"
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
}
