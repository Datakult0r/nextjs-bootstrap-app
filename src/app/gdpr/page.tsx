import React from "react";

type PolicySectionProps = {
  title: string;
  children: React.ReactNode;
};

const PolicySection: React.FC<PolicySectionProps> = ({ title, children }) => (
  <article className="container mb-9 text-base">
    <header className="mb-4 text-xl font-semibold">{title}</header>
    {children}
  </article>
);

export default function GDPRPolicy() {
  const policyData = {
    lastUpdated: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    purpose:
      "The purpose of this policy is to outline Clinic of AI's approach to managing and retaining personal data in compliance with the General Data Protection Regulation (GDPR) regarding data retention practices.",
    scope:
      "This policy applies to all departments and individuals responsible for data retention at Clinic of AI and covers all types of data. It also applies to all geographic areas where Clinic of AI operates.",
    retentionPrinciples: [
      "Lawful Basis for Retention: Clinic of AI will only retain personal data if there is a lawful basis for doing so.",
      "Data Minimization: Clinic of AI will only retain the minimum amount of personal data necessary to achieve the purpose for which it was collected.",
      "Data Accuracy: Clinic of AI will take reasonable steps to ensure that personal data is accurate and up-to-date.",
    ],
    retentionPeriods: [
      "Clinic of AI will retain personal data only for as long as necessary to fulfill the purposes for which it was collected, including legal requirements and business needs.",
      "Clinic of AI will review and update its retention periods on a regular basis to ensure compliance with applicable laws and regulations.",
    ],
    dataDisposal: [
      "Clinic of AI will securely dispose of personal data once the retention period expires, through data deletion, anonymization, or archival processes.",
      "Clinic of AI will ensure that all personal data is disposed of in a manner that is compliant with applicable laws and regulations.",
    ],
    dataSubjectRights: [
      "Clinic of AI recognizes the rights of data subjects under GDPR, including the right to access, rectify, and erase their personal data.",
      "Clinic of AI will respond to data subject requests in a timely and mannerly fashion within the context of data retention.",
    ],
    securityMeasures: [
      "Clinic of AI will implement appropriate technical and organizational security measures to protect retained data from unauthorized access, loss, or misuse.",
      "Clinic of AI will monitor and review its data security measures regularly and update them as necessary to ensure ongoing compliance and effectiveness.",
    ],
    complianceGovernance: [
      "Clinic of AI will establish mechanisms for monitoring and ensuring compliance with this policy.",
      "Clinic of AI will assign responsibilities for data retention and disposal, including the appointment of a Data Protection Officer (DPO) where required.",
      "Clinic of AI will conduct regular audits or reviews of its data retention practices to ensure compliance with applicable laws and regulations.",
    ],
  };

  return (
    <section className="bg-inverse text-inverse-foreground">
      <div>
        <div className="container max-w-5xl pb-24 pt-48">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            GDPR and Data Retention Policy
          </h2>
          <p className="mt-2 text-sm leading-8 text-muted-foreground">
            Last updated: {policyData.lastUpdated}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl pb-28">
        <PolicySection title="Purpose">
          <p>{policyData.purpose}</p>
        </PolicySection>

        <PolicySection title="Scope">
          <p>{policyData.scope}</p>
        </PolicySection>

        <PolicySection title="Data Retention Principles">
          <ol className="mt-2 list-decimal pl-5">
            {policyData.retentionPrinciples.map((principle, index) => (
              <li key={index}>{principle}</li>
            ))}
          </ol>
        </PolicySection>

        <PolicySection title="Retention Periods">
          <ol className="mt-2 list-decimal pl-5">
            {policyData.retentionPeriods.map((period, index) => (
              <li key={index}>{period}</li>
            ))}
          </ol>
        </PolicySection>

        <PolicySection title="Data Disposal">
          <ol className="mt-2 list-decimal pl-5">
            {policyData.dataDisposal.map((disposal, index) => (
              <li key={index}>{disposal}</li>
            ))}
          </ol>
        </PolicySection>

        <PolicySection title="Data Subject Rights">
          <ol className="mt-2 list-decimal pl-5">
            {policyData.dataSubjectRights.map((right, index) => (
              <li key={index}>{right}</li>
            ))}
          </ol>
        </PolicySection>

        <PolicySection title="Data Security Measures">
          <ol className="mt-2 list-decimal pl-5">
            {policyData.securityMeasures.map((measure, index) => (
              <li key={index}>{measure}</li>
            ))}
          </ol>
        </PolicySection>

        <PolicySection title="Compliance and Governance">
          <ol className="mt-2 list-decimal pl-5">
            {policyData.complianceGovernance.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </PolicySection>

        <article className="container mb-9 text-base">
          <p>
            This GDPR and Data Retention Policy serves as a guiding document for
            Clinic of AI to establish consistent and compliant data retention
            practices while safeguarding the privacy rights of individuals.
          </p>
        </article>
      </div>
    </section>
  );
}
