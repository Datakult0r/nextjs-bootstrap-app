import {
  type PricingPlanCardProps,
  PricingPlanCard,
} from "../cards/PricingPlanCard";
import { TitleBlock } from "@/components/common/title-block";

const content: PricingPlanCardProps[] = [
  {
    name: "Starter Plan",
    price: "$299",
    description: "Perfect for small restaurants or boutique hotels for single incremental innovation",
    features: [
      "24/7 AI concierge",
      "Multilingual support", 
      "Basic integrations"
    ],
    cta: "Get Started",
  },
  {
    name: "Pro Plan",
    price: "$500",
    description: "Ideal for medium-sized businesses with growing needs. We provide a roadmap by Industry specific AI-strategist",
    features: [
      "All Starter features",
      "Advanced integrations (PMS, CRM, POS)",
      "Customizable branding",
      "DevOps and Continuous Maintenance"
    ],
    cta: "Try Pro",
    highlighted: true,
  },
  {
    name: "Elite Plan",
    price: "Custom",
    description: "Custom AI Solutions, Constantly Innovating. Perfect for businesses aiming to lead their industry by leveraging cutting-edge AI technologies.",
    features: [
      "All Pro Plan features",
      "Dedicated AI R&D team that researches, implements, and teaches emerging technologies",
      "Access to an AI strategist with domain expertise",
      "Direct collaboration for continuous innovation",
      "Value chain upgrades"
    ],
    cta: "Contact for Quote",
  },
];

export function PricingSection() {
  return (
    <section className="w-full pb-12 dark:bg-gray-800 md:pb-24 lg:pb-32 pt-6">
      <div className="container  space-y-20">
        <TitleBlock
          title="Pricing"
          heading="Choose the plan that's right for you"
          classNames={{
            container: "max-w-[640px] mx-auto"
          }}
        />
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.map((plan) => (
            <PricingPlanCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
