import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo/site-logo.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <Link
        href="/"
        aria-label="Bhalow — home"
        className="mb-8 inline-block rounded-sm focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
      >
        <Image
          src={logo}
          alt="Bhalow"
          height={36}
          priority
          placeholder="blur"
          className="h-9 w-auto"
        />
      </Link>
      {children}
    </main>
  );
}
