import { Facebook01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

type Props = {
  label?: string;
  redirectTo?: string;
};

export function FacebookSignIn({
  label = "Continue with Facebook",
  redirectTo = "/",
}: Props) {
  async function action() {
    "use server";
    await signIn("facebook", { redirectTo });
  }

  return (
    <form action={action}>
      <Button type="submit" size="lg" className="h-11 w-full text-sm">
        <HugeiconsIcon icon={Facebook01Icon} strokeWidth={2} />
        {label}
      </Button>
    </form>
  );
}
