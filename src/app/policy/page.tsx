import React, { ReactNode } from "react";

type PolicySectionProps = {
  title: string;
  children: ReactNode;
};

const PolicySection: React.FC<PolicySectionProps> = ({ title, children }) => (
  <article className="container mb-9 text-base">
    <header className="mb-4 text-xl font-semibold">{title}</header>
    {children}
  </article>
);

type PolicyListProps = {
  items: string[];
};

const PolicyList: React.FC<PolicyListProps> = ({ items }) => (
  <ul className="mt-2 list-disc pl-5">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

export default function PrivacyPolicy() {
  const policyData = {
    lastUpdated: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    businessType:
      "Clinic of AI is an LLC providing AI optimization services to other businesses.",
    contactInfo: {
      address: "3rd Floor, 86-90 Paul Street, London EC2A 4NEC, United Kingdom",
      phone: "+41799608477",
      email: "General@clinicofai.com",
    },
    websiteInfo:
      "This Privacy Policy applies to the Clinic of AI website at https://www.clinicofai.com and any other websites or applications owned or operated by Clinic of AI that link to this Privacy Policy.",
    personalInfo: {
      collected: [
        "Names and contact information (such as email addresses and phone numbers) for the purpose of providing our services and communicating with clients",
        "Payment information for the purpose of processing payments for our services",
        "Other information that clients provide to us in the course of using our services",
      ],
      usedFor: [
        "Providing our services to our clients",
        "Communicating with clients about our services and their accounts",
        "Processing payments for our services",
        "Complying with applicable laws and regulations",
      ],
    },
    thirdPartySharing: {
      providers: [
        "Payment processors",
        "Analytics services",
        "Marketing partners",
      ],
      policy:
        "We only share personal information with these third-party providers to the extent necessary for them to provide their services to us. We require these providers to maintain the confidentiality of the personal information we share with them.",
    },
    cookiesPolicy:
      "Our website and applications may use cookies and other tracking technologies to collect information about users and improve our services. Users can manage their cookie preferences through their web browser settings.",
    compliance:
      "Clinic of AI is committed to complying with all applicable privacy laws and regulations, including the General Data Protection Regulation (GDPR) EWU, Swiss and the California Consumer Privacy Act (CCPA). If you have any questions or concerns about how we handle personal information, please contact us at Clinic of AI our customer service e-mail: General@clinicofai.com",
  };

  return (
    <section className="bg-inverse text-inverse-foreground">
      <div>
        <div className="container max-w-5xl pb-24 pt-48">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Privacy Policy
          </h2>
          <p className="mt-2 text-sm leading-8 text-muted-foreground">
            Last updated: {policyData.lastUpdated}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl pb-28">
        <article className="container mb-8 text-base">
          <p>
            This Privacy Policy applies to the personal information collected,
            used, stored, and shared by Clinic of AI in the course of providing
            AI optimization services to our B2B clients.
          </p>
        </article>

        <PolicySection title="Type of Business">
          <p>{policyData.businessType}</p>
        </PolicySection>

        <PolicySection title="Contact Information">
          <p>Our contact information is as follows:</p>
          <PolicyList
            items={[
              `Mailing Address: ${policyData.contactInfo.address}`,
              `Phone: ${policyData.contactInfo.phone}`,
              `Email Address: ${policyData.contactInfo.email}`,
            ]}
          />
        </PolicySection>

        <PolicySection title="Website or Application Information">
          <p>{policyData.websiteInfo}</p>
        </PolicySection>

        <PolicySection title="Collection and Use of Personal Information">
          <p>
            We collect the following types of personal information from our
            clients and their employees:
          </p>
          <PolicyList items={policyData.personalInfo.collected} />
          <p className="mt-4">
            We use this information for the following purposes:
          </p>
          <PolicyList items={policyData.personalInfo.usedFor} />
        </PolicySection>

        <PolicySection title="Third-Party Sharing">
          <p>
            We may share personal information with third-party service providers
            or partners when necessary for the purpose of providing our
            services. These third-party providers may include:
          </p>
          <PolicyList items={policyData.thirdPartySharing.providers} />
          <p className="mt-4">{policyData.thirdPartySharing.policy}</p>
        </PolicySection>

        <PolicySection title="Cookies and Tracking Technologies">
          <p>{policyData.cookiesPolicy}</p>
        </PolicySection>

        <PolicySection title="Compliance with Laws and Regulations">
          <p>{policyData.compliance}</p>
        </PolicySection>
      </div>
    </section>
  );
}
