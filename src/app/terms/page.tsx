import React, { ReactNode } from "react";

type TermsSectionProps = {
  title: string;
  children: ReactNode;
};

const TermsSection: React.FC<TermsSectionProps> = ({ title, children }) => (
  <article className="container mb-9 text-base">
    <header className="mb-4 text-xl font-semibold">{title}</header>
    {children}
  </article>
);

export default function TermsConditions() {
  const termsData = {
    lastUpdated: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    sections: [
      {
        title: "Overview",
        content: `Please carefully read the following terms of use policy (the "Policy") as it governs your use of our platform. By accessing and using our platform, you agree to comply with and be bound by the terms and conditions set forth in this policy. If you do not agree to these terms, please do not use our platform.`,
      },
      {
        title: "1. Description of the Service",
        content: `Clinic of AI specializes in workflow automation with AI-optimization and software development. Our platform provides users with innovative tools and solutions to enhance their workflows and optimize their business processes.`,
      },
      {
        title: "2. User Obligations",
        content: `When using our platform, you must abide by the following rules and guidelines: You must not engage in any illegal, abusive, or harmful activities. You must not violate any applicable laws or regulations. You must not interfere with the proper functioning of our platform. You must not attempt to gain unauthorized access to our platform or its systems. You must not engage in any activity that may disrupt or impair the experience of other users.`,
      },
      {
        title: "3. Intellectual Property Rights",
        content: `The content and intellectual property available on our platform are owned by Clinic of AI. You may not use, modify, distribute, or reproduce any of our content without our prior written consent. By using our platform, you agree to grant Clinic of AI a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute any user-generated content you submit through our platform.`,
      },
      {
        title: "4. Liability and Indemnification",
        content: `Clinic of AI shall not be liable for any damages or losses arising from your use of our platform. By using our platform, you agree to indemnify and hold Clinic of AI harmless from any claims, demands, or damages, including reasonable attorney fees, made by any third party due to or arising out of your use of our platform or your violation of this policy.`,
      },
      {
        title: "5. Privacy Practices",
        content: `Our platform's privacy practices are outlined in our separate Privacy Policy. By using our platform, you consent to the collection, use, and sharing of your personal information as described in our Privacy Policy. Please carefully review our Privacy Policy to understand how we handle your data.`,
      },
      {
        title: "6. Dispute Resolution",
        content: `Any disputes arising from or relating to this policy or your use of our platform shall be resolved through arbitration in accordance with the rules of the arbitration board chosen by the Clinic of AI. The decisions of the arbitrators shall be final and binding.`,
      },
      {
        title: "7. Changes to the Policy",
        content: `Clinic of AI reserves the right to update or revise this policy at any time without prior notice. By continuing to use our platform after any changes to this Policy, you agree to be bound by the updated or revised terms.`,
      },
      {
        title: "8. Termination",
        content: `Clinic of AI may, in its sole discretion, terminate or suspend your access to our platform if you violate any provision of this Policy or for any other reason deemed appropriate by Clinic of AI. In the event of termination, you will no longer have access to your account and any associated data.`,
      },
    ],
    contactEmail: "General@clinicofai.com",
  };

  return (
    <section className="bg-inverse text-inverse-foreground">
      <div>
        <div className="container max-w-5xl pb-24 pt-48">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Terms of Use Policy
          </h2>
          <p className="mt-2 text-sm leading-8 text-muted-foreground">
            Last updated: {termsData.lastUpdated}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl pb-28">
        {termsData.sections.map((section, index) => (
          <TermsSection key={index} title={section.title}>
            <p>{section.content}</p>
          </TermsSection>
        ))}

        <p className="container mb-9 text-base">
          Please review and comply with this policy to ensure a positive and
          productive experience on our platform. If you have any questions or
          concerns regarding this Policy, please contact us at{" "}
          {termsData.contactEmail}
        </p>
      </div>
    </section>
  );
}
