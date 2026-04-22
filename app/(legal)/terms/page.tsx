import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of Bhalow's website, apps, and services, including features that integrate with Facebook and other OAuth providers.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <header className="border-border mb-10 border-b pb-6">
        <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
          Legal
        </p>
        <h1 className="text-foreground mt-2 text-3xl font-semibold tracking-tight">
          Terms of Service
        </h1>
        <p className="text-muted-foreground mt-2 text-xs">
          Last updated October 30, 2025
        </p>
      </header>

      <p className="text-muted-foreground mb-8">
        These Terms of Service (&quot;Terms&quot;) govern your access to and use
        of Bhalow Inc.&apos;s website, mobile apps, and services (the
        &quot;Services&quot;). By using the Services you agree to these Terms;
        if you do not agree, you must stop using them.
      </p>

      <div className="space-y-8">
        <section aria-labelledby="acceptance">
          <h2
            id="acceptance"
            className="text-foreground mb-3 text-lg font-semibold"
          >
            1. Acceptance of terms
          </h2>
          <p className="text-muted-foreground">
            By creating an account, signing in with a third-party provider, or
            otherwise using the Services, you agree to be bound by these Terms
            and by any additional policies referenced here, including our{" "}
            <a href="/privacy" className="hover:text-foreground underline">
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="license">
          <h2
            id="license"
            className="text-foreground mb-3 text-lg font-semibold"
          >
            2. Use license
          </h2>
          <p className="text-muted-foreground">
            Bhalow grants you a limited, non-exclusive, non-transferable license
            to access and use the Services for personal, non-commercial,
            transitory viewing. You may not:
          </p>
          <ul className="text-muted-foreground mt-2 list-disc space-y-1 pl-5">
            <li>Modify, copy, or create derivative works from the Services</li>
            <li>Use the Services for commercial purposes without consent</li>
            <li>
              Attempt to reverse-engineer, decompile, or disassemble any part of
              the Services
            </li>
            <li>Remove copyright, trademark, or other proprietary notices</li>
          </ul>
        </section>

        <section aria-labelledby="facebook">
          <h2
            id="facebook"
            className="text-foreground mb-3 text-lg font-semibold"
          >
            3. Facebook integration
          </h2>
          <p className="text-muted-foreground">
            When you use features that connect with Facebook, you must also
            comply with Facebook&apos;s Terms of Service and Community
            Standards. You are responsible for any content you authorize us to
            access or publish on your behalf.
          </p>
        </section>

        <section aria-labelledby="accounts">
          <h2
            id="accounts"
            className="text-foreground mb-3 text-lg font-semibold"
          >
            4. User accounts
          </h2>
          <ul className="text-muted-foreground list-disc space-y-1 pl-5">
            <li>
              You must provide accurate, current, and complete information when
              creating an account.
            </li>
            <li>
              You are responsible for safeguarding your password and for any
              activity under your account.
            </li>
            <li>
              You must notify us immediately of unauthorized access or use.
            </li>
          </ul>
        </section>

        <section aria-labelledby="prohibited">
          <h2
            id="prohibited"
            className="text-foreground mb-3 text-lg font-semibold"
          >
            5. Prohibited uses
          </h2>
          <p>You agree not to use the Services to:</p>
          <ul className="text-muted-foreground mt-2 list-disc space-y-1 pl-5">
            <li>Violate any applicable law or regulation</li>
            <li>
              Infringe anyone&apos;s intellectual property or privacy rights
            </li>
            <li>Harass, abuse, or harm another person</li>
            <li>Submit false, misleading, or deceptive information</li>
            <li>
              Interfere with or disrupt the integrity or performance of the
              Services
            </li>
          </ul>
        </section>

        <section aria-labelledby="termination">
          <h2
            id="termination"
            className="text-foreground mb-3 text-lg font-semibold"
          >
            6. Termination
          </h2>
          <p className="text-muted-foreground">
            We may suspend or terminate your access to the Services at any time,
            without notice or liability, if we reasonably believe you have
            breached these Terms. You may stop using the Services at any time.
          </p>
        </section>

        <section aria-labelledby="disclaimer">
          <h2
            id="disclaimer"
            className="text-foreground mb-3 text-lg font-semibold"
          >
            7. Disclaimer
          </h2>
          <p className="text-muted-foreground">
            The Services are provided &quot;as is&quot; and &quot;as
            available&quot; without warranties of any kind, either express or
            implied, including merchantability, fitness for a particular
            purpose, and non-infringement, to the fullest extent permitted by
            law.
          </p>
        </section>

        <section aria-labelledby="sms-terms">
          <h2
            id="sms-terms"
            className="text-foreground mb-3 text-lg font-semibold"
          >
            8. SMS messaging terms
          </h2>
          <p className="text-muted-foreground">
            If you opt in to SMS, you may receive account and transaction
            notifications. Message and data rates may apply. You can opt out any
            time by replying <strong>STOP</strong>, <strong>UNSUBSCRIBE</strong>
            , <strong>CANCEL</strong>, <strong>END</strong>, or{" "}
            <strong>QUIT</strong> to any message.
          </p>
        </section>

        <section aria-labelledby="changes">
          <h2
            id="changes"
            className="text-foreground mb-3 text-lg font-semibold"
          >
            9. Changes to these terms
          </h2>
          <p className="text-muted-foreground">
            We may update these Terms from time to time. For material changes we
            will provide at least 30 days&apos; notice through the Services or
            by email. Your continued use after changes take effect means you
            accept the updated Terms.
          </p>
        </section>

        <section
          aria-labelledby="contact"
          className="border-border bg-card rounded-md border p-5"
        >
          <h2
            id="contact"
            className="text-foreground mb-2 text-base font-semibold"
          >
            Contact
          </h2>
          <address className="text-muted-foreground space-y-1 not-italic">
            <p>Bhalow Inc.</p>
            <p>
              <a
                href="mailto:info@bhalow.com"
                className="hover:text-foreground underline"
              >
                info@bhalow.com
              </a>
            </p>
            <p>
              <a
                href="https://bhalow.com"
                className="hover:text-foreground underline"
              >
                bhalow.com
              </a>
            </p>
          </address>
        </section>
      </div>
    </>
  );
}
