import Link from "next/link";

import type { Metadata } from "next";

import { FacebookSignIn } from "@/components/facebook-sign-in";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create your Bhalow account.",
  alternates: { canonical: "/register" },
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return (
    <section
      aria-labelledby="register-title"
      className="border-border bg-card w-full max-w-sm rounded-md border p-6 shadow-sm sm:p-8"
    >
      <header className="mb-6 text-center">
        <h1
          id="register-title"
          className="text-foreground text-xl font-semibold tracking-tight"
        >
          Create your Bhalow account
        </h1>
        <p className="text-muted-foreground mt-1 text-xs">
          Sign up with your Facebook account — we&apos;ll set the rest up for
          you.
        </p>
      </header>

      <FacebookSignIn label="Sign up with Facebook" redirectTo="/" />

      <p className="text-muted-foreground mt-6 text-center text-xs">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-foreground hover:text-primary font-medium underline underline-offset-2"
        >
          Sign in
        </Link>
      </p>

      <p className="text-muted-foreground mt-6 text-center text-[11px] leading-5">
        By creating an account you agree to our{" "}
        <Link href="/terms" className="hover:text-foreground underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="hover:text-foreground underline">
          Privacy Policy
        </Link>
        .
      </p>
    </section>
  );
}
