import Link from "next/link";

import type { Metadata } from "next";

import { FacebookSignIn } from "@/components/facebook-sign-in";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Bhalow account.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <section
      aria-labelledby="login-title"
      className="w-full max-w-sm rounded-md border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      <header className="mb-6 text-center">
        <h1
          id="login-title"
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          Sign in to Bhalow
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Welcome back. Pick a method to continue.
        </p>
      </header>

      <FacebookSignIn label="Continue with Facebook" redirectTo="/" />

      <p className="mt-6 text-center text-xs text-muted-foreground">
        New to Bhalow?{" "}
        <Link
          href="/register"
          className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
        >
          Create an account
        </Link>
      </p>

      <p className="mt-6 text-center text-[11px] leading-5 text-muted-foreground">
        By continuing you agree to our{" "}
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
