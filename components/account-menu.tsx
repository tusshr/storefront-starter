import Link from "next/link";

import { UserIcon } from "@phosphor-icons/react/dist/ssr";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Account"
        className="text-foreground hover:bg-muted focus-visible:ring-ring/30 inline-flex size-10 items-center justify-center overflow-hidden rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        <UserIcon className="size-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-52">
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
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/wishlist" />}>
            Wishlist
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/orders" />}>
            Orders
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
