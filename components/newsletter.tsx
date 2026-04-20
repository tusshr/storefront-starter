import { Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

async function subscribe(formData: FormData) {
  "use server";
  const email = formData.get("email");
  // TODO: wire to email provider once backend is ready.
  console.log("newsletter subscribe", email);
}

export function Newsletter() {
  return (
    <section
      aria-labelledby="newsletter-title"
      className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-8"
    >
      <div className="flex flex-col items-start gap-4 rounded-xl border border-border bg-secondary p-8 text-secondary-foreground md:flex-row md:items-center md:gap-8 md:p-12">
        <span
          aria-hidden="true"
          className="flex size-12 items-center justify-center rounded-md bg-background text-foreground"
        >
          <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />
        </span>
        <div className="flex-1">
          <h2
            id="newsletter-title"
            className="text-xl font-semibold sm:text-2xl"
          >
            New drops, first.
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Subscribe for launches, deals, and style picks. Unsubscribe
            anytime.
          </p>
        </div>
        <form
          action={subscribe}
          className="flex w-full max-w-md items-stretch gap-2"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="h-10 flex-1"
          />
          <Button type="submit" size="lg">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
