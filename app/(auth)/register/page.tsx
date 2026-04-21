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
      className="w-full max-w-sm rounded-md border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      <header className="mb-6 text-center">
        <h1
          id="register-title"
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          Create your Bhalow account
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Sign up with your Facebook account — we'll set the rest up for you.
        </p>
      </header>

      <FacebookSignIn label="Sign up with Facebook" redirectTo="/" />

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
        >
          Sign in
        </Link>
      </p>

      <p className="mt-6 text-center text-[11px] leading-5 text-muted-foreground">
        By creating an account you agree to our{" "}
        <Link href="/terms" className="underline hover:text-foreground">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </Link>
        .
      </p>
    </section>
  );
}
