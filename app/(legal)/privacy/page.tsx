import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Bhalow collects, uses, and protects your personal information, including data obtained through Facebook and other OAuth providers.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="mb-10 border-b border-border pb-6">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Legal
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          Last updated October 30, 2025
        </p>
      </header>

      <p className="mb-8 text-muted-foreground">
        This Privacy Policy explains how Bhalow Inc. ("Bhalow", "we", "us")
        collects, uses, and protects your information when you use our website,
        apps, and services (the "Services"), including features that connect
        with Facebook and other OAuth providers.
      </p>

      <div className="space-y-8">
        <section aria-labelledby="information-we-collect">
          <h2
            id="information-we-collect"
            className="mb-3 text-lg font-semibold text-foreground"
          >
            1. Information we collect
          </h2>
          <p>
            We collect information you provide directly, data generated through
            your use of the Services, and data received from third parties you
            connect.
          </p>
          <h3 className="mt-4 mb-1 text-sm font-semibold text-foreground">
            Personal information
          </h3>
          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
            <li>Name and email address</li>
            <li>Profile information and account preferences</li>
            <li>Communication history with our team</li>
          </ul>
          <h3 className="mt-4 mb-1 text-sm font-semibold text-foreground">
            Facebook data
          </h3>
          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
            <li>Basic profile information</li>
            <li>Friends list (only with your permission)</li>
            <li>Pages you manage</li>
            <li>Posts and engagement data you explicitly share</li>
          </ul>
        </section>

        <section aria-labelledby="how-we-use">
          <h2
            id="how-we-use"
            className="mb-3 text-lg font-semibold text-foreground"
          >
            2. How we use your information
          </h2>
          <p>We use the information we collect to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>Provide, maintain, and improve the Services</li>
            <li>Process transactions and send related communications</li>
            <li>Send technical notices, updates, and security alerts</li>
            <li>Respond to your questions, requests, and feedback</li>
            <li>Analyze usage patterns to improve the product</li>
            <li>Detect, investigate, and prevent fraud or abuse</li>
          </ul>
        </section>

        <section aria-labelledby="facebook-integration">
          <h2
            id="facebook-integration"
            className="mb-3 text-lg font-semibold text-foreground"
          >
            3. Facebook integration
          </h2>
          <p>
            When you connect your Facebook account, we access only the data
            required to deliver the feature you requested, in compliance with
            Facebook's Platform Terms and Developer Policies.
          </p>
          <h3 className="mt-4 mb-1 text-sm font-semibold text-foreground">
            Access and permissions
          </h3>
          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
            <li>We request the minimum permissions necessary.</li>
            <li>
              You can revoke Bhalow's access at any time from your Facebook
              settings.
            </li>
            <li>
              We retain data only for as long as needed to provide the
              Services, per our retention guidelines.
            </li>
          </ul>
          <h3 className="mt-4 mb-1 text-sm font-semibold text-foreground">
            Data sharing
          </h3>
          <p className="text-muted-foreground">
            Anonymized, aggregated data may be shared with Facebook for
            analytics in accordance with their policies. We never share
            personally identifiable Facebook data back to Facebook unless
            required to deliver the Service.
          </p>
        </section>

        <section aria-labelledby="information-sharing">
          <h2
            id="information-sharing"
            className="mb-3 text-lg font-semibold text-foreground"
          >
            4. Information sharing
          </h2>
          <p>
            We do not sell, trade, or rent your personal information. We may
            disclose information only in these circumstances:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>When required by law or valid legal process</li>
            <li>
              In connection with a merger, acquisition, or sale of company
              assets
            </li>
            <li>
              With vetted service providers acting on our behalf under
              confidentiality obligations
            </li>
            <li>With your explicit consent</li>
          </ul>
        </section>

        <section aria-labelledby="data-security">
          <h2
            id="data-security"
            className="mb-3 text-lg font-semibold text-foreground"
          >
            5. Data security
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
            <li>Encryption in transit and at rest</li>
            <li>Regular security assessments and reviews</li>
            <li>Role-based access controls</li>
            <li>Mandatory privacy training for employees</li>
          </ul>
          <p className="mt-2 text-muted-foreground">
            No method of transmission or storage is 100% secure; we cannot
            guarantee absolute security, only industry-standard safeguards.
          </p>
        </section>

        <section aria-labelledby="your-rights">
          <h2
            id="your-rights"
            className="mb-3 text-lg font-semibold text-foreground"
          >
            6. Your rights
          </h2>
          <p>You have the right to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>
              Request deletion of your data — see our{" "}
              <Link
                href="/data-deletion"
                className="underline hover:text-foreground"
              >
                Data Deletion page
              </Link>
            </li>
            <li>Export your data in a structured, machine-readable format</li>
          </ul>
        </section>

        <section aria-labelledby="cookies">
          <h2
            id="cookies"
            className="mb-3 text-lg font-semibold text-foreground"
          >
            7. Cookies and tracking
          </h2>
          <p className="text-muted-foreground">
            We use cookies and similar technologies to keep you signed in,
            remember your preferences, and understand how the Services are
            used. You can control cookies through your browser settings;
            disabling them may affect functionality.
          </p>
        </section>

        <section aria-labelledby="childrens-privacy">
          <h2
            id="childrens-privacy"
            className="mb-3 text-lg font-semibold text-foreground"
          >
            8. Children's privacy
          </h2>
          <p className="text-muted-foreground">
            Our Services are not directed to children under 13, and we do not
            knowingly collect personal information from them. If you believe a
            child has provided us data, contact us and we will delete it.
          </p>
        </section>

        <section aria-labelledby="sms">
          <h2 id="sms" className="mb-3 text-lg font-semibold text-foreground">
            9. SMS communications and consent
          </h2>
          <p className="text-muted-foreground">
            If you provide a phone number, you consent to receive SMS messages
            including account alerts, transaction updates, and service
            notifications. Message and data rates may apply. Consent to
            messaging is not a condition of purchase. You can withdraw consent
            at any time by replying <strong>STOP</strong> to any message.
          </p>
        </section>

        <section aria-labelledby="changes">
          <h2
            id="changes"
            className="mb-3 text-lg font-semibold text-foreground"
          >
            10. Changes to this policy
          </h2>
          <p className="text-muted-foreground">
            We may update this policy from time to time. When we do, we will
            revise the "Last updated" date above and, where appropriate, notify
            you through the Services.
          </p>
        </section>

        <section
          aria-labelledby="contact"
          className="rounded-md border border-border bg-card p-5"
        >
          <h2
            id="contact"
            className="mb-2 text-base font-semibold text-foreground"
          >
            Contact
          </h2>
          <address className="space-y-1 text-muted-foreground not-italic">
            <p>Bhalow Inc.</p>
            <p>17519 90th Ave, Jamaica, NY 11432</p>
            <p>
              <a
                href="mailto:info@bhalow.com"
                className="underline hover:text-foreground"
              >
                info@bhalow.com
              </a>
            </p>
          </address>
        </section>
      </div>
    </>
  );
}
