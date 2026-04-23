"use client";

import { useEffect, useState } from "react";

type Parts = { hours: string; minutes: string; seconds: string };

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function computeParts(targetMs: number): Parts {
  const diff = Math.max(0, targetMs - Date.now());
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { hours: pad(h), minutes: pad(m), seconds: pad(s) };
}

/**
 * Counts down from `durationHours` after mount. Computing the target client-side
 * keeps the server component deterministic (required under Cache Components).
 * When deals come from the DB, switch to an `endsAt` ISO string prop.
 */
export function DealCountdown({
  durationHours = 24,
}: {
  durationHours?: number;
}) {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const target = Date.now() + durationHours * 3_600_000;
    const tick = () => setParts(computeParts(target));
    queueMicrotask(tick);
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [durationHours]);

  return (
    <div
      className="flex items-center gap-1.5 font-mono text-sm"
      aria-label="Time remaining"
      role="timer"
    >
      <Cell label="hours" value={parts?.hours ?? "--"} />
      <span aria-hidden="true">:</span>
      <Cell label="minutes" value={parts?.minutes ?? "--"} />
      <span aria-hidden="true">:</span>
      <Cell label="seconds" value={parts?.seconds ?? "--"} />
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <span className="bg-foreground text-background flex min-w-9 items-center justify-center rounded-md px-1.5 py-1 font-semibold tabular-nums">
      <span className="sr-only">{label}: </span>
      {value}
    </span>
  );
}
