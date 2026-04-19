import Link from "next/link";

import { UserAccountIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { auth, signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export async function AccountMenu() {
  const session = await auth();
  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Account"
        className="inline-flex size-10 items-center justify-center overflow-hidden rounded-md text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
      >
        {user?.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={user.image}
            alt={user.name ?? "Account"}
            referrerPolicy="no-referrer"
            className="size-7 rounded-full object-cover"
          />
        ) : (
          <HugeiconsIcon icon={UserAccountIcon} strokeWidth={2} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-52">
        {user ? (
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              <span className="block truncate text-sm font-medium text-foreground">
                {user.name ?? "Signed in"}
              </span>
              {user.email && (
                <span className="block truncate text-xs font-normal text-muted-foreground">
                  {user.email}
                </span>
              )}
            </DropdownMenuLabel>
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuLabel>Welcome</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/login" />}>
              Sign in
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/register" />}>
              Create account
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/wishlist" />}>
            Wishlist
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/orders" />}>
            Orders
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {user && (
          <>
            <DropdownMenuSeparator />
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
              className="contents"
            >
              <DropdownMenuItem
                render={<button type="submit" className="w-full" />}
              >
                Sign out
              </DropdownMenuItem>
            </form>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
