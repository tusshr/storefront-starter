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
      className="border-border bg-card w-full max-w-sm rounded-md border p-6 shadow-sm sm:p-8"
    >
      <header className="mb-6 text-center">
        <h1
          id="login-title"
          className="text-foreground text-xl font-semibold tracking-tight"
        >
          Sign in to Bhalow
        </h1>
        <p className="text-muted-foreground mt-1 text-xs">
          Welcome back. Pick a method to continue.
        </p>
      </header>

      <FacebookSignIn label="Continue with Facebook" redirectTo="/" />

      <p className="text-muted-foreground mt-6 text-center text-xs">
        New to Bhalow?{" "}
        <Link
          href="/register"
          className="text-foreground hover:text-primary font-medium underline underline-offset-2"
        >
          Create an account
        </Link>
      </p>

      <p className="text-muted-foreground mt-6 text-center text-[11px] leading-5">
        By continuing you agree to our{" "}
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
