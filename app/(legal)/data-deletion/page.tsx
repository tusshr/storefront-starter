import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Deletion",
  description:
    "How to request deletion of personal data collected by Bhalow through Facebook and other OAuth integrations.",
  alternates: { canonical: "/data-deletion" },
};

export default function DataDeletionPage() {
  return (
    <>
      <header className="mb-10 border-b border-border pb-6">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Legal
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Data Deletion
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          User data deletion instructions for Bhalow's Facebook app and related
          OAuth integrations.
        </p>
      </header>

      <p className="mb-8 text-muted-foreground">
        You can request that we delete the personal data we've collected about
        you through Bhalow's Facebook app or any other OAuth provider. This
        page explains how the process works and what to expect.
      </p>

      <div className="space-y-8">
        <section aria-labelledby="how-to-request">
          <h2
            id="how-to-request"
            className="mb-3 text-lg font-semibold text-foreground"
          >
            1. How to request deletion
          </h2>
          <p>You have two options:</p>

          <div className="mt-4 space-y-4">
            <div className="rounded-md border border-border bg-card p-4">
              <h3 className="mb-1 text-sm font-semibold text-foreground">
                Option A — Disconnect via Facebook
              </h3>
              <ol className="list-decimal space-y-1 pl-5 text-muted-foreground">
                <li>Open Facebook's Settings &amp; Privacy.</li>
                <li>Go to Apps and Websites.</li>
                <li>
                  Find <strong>Bhalow</strong> in the list and select Remove.
                </li>
              </ol>
              <p className="mt-2 text-muted-foreground">
                This revokes Bhalow's access to your Facebook data. We will
                also remove the associated data from our systems per the
                timeline below.
              </p>
            </div>

            <div className="rounded-md border border-border bg-card p-4">
              <h3 className="mb-1 text-sm font-semibold text-foreground">
                Option B — Email us directly
              </h3>
              <p className="text-muted-foreground">
                Send a deletion request to{" "}
                <a
                  href="mailto:privacy@bhalow.com"
                  className="underline hover:text-foreground"
                >
                  privacy@bhalow.com
                </a>{" "}
                (or{" "}
                <a
                  href="mailto:info@bhalow.com"
                  className="underline hover:text-foreground"
                >
                  info@bhalow.com
                </a>
                ) from the email address associated with your account. Include
                the name on the account so we can verify the request.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="timeline">
          <h2
            id="timeline"
            className="mb-3 text-lg font-semibold text-foreground"
          >
            2. Timeline
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
            <li>
              <strong className="text-foreground">
                Acknowledgement (within 48 hours)
              </strong>{" "}
              — we confirm receipt of your request.
            </li>
            <li>
              <strong className="text-foreground">
                Identity verification (1–3 business days)
              </strong>{" "}
              — we confirm the request comes from the account owner.
            </li>
            <li>
              <strong className="text-foreground">
                Data removal (within 30 days)
              </strong>{" "}
              — we delete the data from active systems.
            </li>
            <li>
              <strong className="text-foreground">Confirmation</strong> — we
              notify you when deletion is complete.
            </li>
          </ol>
        </section>

        <section aria-labelledby="data-covered">
          <h2
            id="data-covered"
            className="mb-3 text-lg font-semibold text-foreground"
          >
            3. Data covered
          </h2>
          <p>The deletion applies to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>Facebook profile information on file</li>
            <li>Posts and content we've accessed on your behalf</li>
            <li>Friends-list data (if granted)</li>
            <li>Page-management data</li>
            <li>Product analytics tied to your account</li>
            <li>Authentication tokens and session data</li>
          </ul>
        </section>

        <section aria-labelledby="limitations">
          <h2
            id="limitations"
            className="mb-3 text-lg font-semibold text-foreground"
          >
            4. Limitations
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
            <li>
              We may retain transaction and financial records where required by
              law.
            </li>
            <li>
              Backup systems are purged on a rolling basis; residual copies
              are removed within 90 days.
            </li>
            <li>
              Anonymized analytics that cannot be tied to your identity may be
              retained.
            </li>
            <li>
              This deletion only affects Bhalow's systems. Facebook retains
              data under its own policies — revoking app access does not
              delete your Facebook account.
            </li>
          </ul>
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
            <p>Bhalow Inc. — Privacy Team</p>
            <p>
              <a
                href="mailto:privacy@bhalow.com"
                className="underline hover:text-foreground"
              >
                privacy@bhalow.com
              </a>
            </p>
            <p>
              <a
                href="mailto:info@bhalow.com"
                className="underline hover:text-foreground"
              >
                info@bhalow.com
              </a>
            </p>
            <p>Response time: within 48 hours</p>
          </address>
        </section>
      </div>
    </>
  );
}
