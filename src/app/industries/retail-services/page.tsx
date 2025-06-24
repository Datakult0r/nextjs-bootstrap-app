// import { industries } from "@/data/industries";
// import { HeroBackgroundImageCTA } from "@/components/features/industries/Hero/HeroBackgroundImageCTA";
// import { FeatureHighlightSection } from "@/components/features/industries/FeatureHighlightSection";
// import { ValueChainDiagramSection } from "@/components/features/industries/ValueChainDiagramSection";
// import { SolutionSteps } from "@/components/features/industries/SolutionSteps";
// import { PricingSection } from "@/components/features/industries/PricingSection";
// import { CTASection } from "@/components/features/industries/CTASection";
// import { discoveryCallBookingSource } from "@/app/config";
// import { LeadForm } from "@/components/common/lead-form";
// import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
// import { retailPricingPlans } from "@/data/pricing-plan";

export default function RetailServices() {
  // const { href, ...restRetail } = industries.find(
  //   (industry) => industry.tag === "retail & services",
  // ) as (typeof industries)[number];

  return (
    <>
      {/* <HeroBackgroundImageCTA
        content={{
          ...restRetail,
          cta: {
            component: (
              <LeadForm
                source={discoveryCallBookingSource.bookingUrl}
                id={discoveryCallBookingSource.bookingId}
              >
                <AnimatedArrowButton className="w-fit">
                  Book a Call
                </AnimatedArrowButton>
              </LeadForm>
            ),
          },
        }}
      />
      <FeatureHighlightSection
        content={{
          tagline: "Retail & Services",
          title:
            "Transforming Retail and Services with AI: Innovative Solutions for Your Business",
          description:
            "In today's competitive landscape, the retail and services industry is constantly seeking ways to enhance customer experiences, streamline operations, and drive growth. At Clinic of AI, we specialize in harnessing the power of artificial intelligence to craft AI-powered solutions that are designed to address the unique challenges and goals of the retail and services sector. From personalized customer interactions to optimized inventory management, our cutting-edge tools and technologies can help you transform your business and achieve remarkable results.",
          image:
            "https://images.pexels.com/photos/5413724/pexels-photo-5413724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        }}
      />
      <ValueChainDiagramSection />
      <SolutionSteps
        content={{
          title: "Our Solution",
          description:
            "Our solution is designed to help you transform your business and achieve remarkable results.",
          image: "/image/thumbnail/old-man-looking-at-git-smilling.png",
          steps,
        }}
      />
      <PricingSection content={retailPricingPlans} />
      <CTASection /> */}
    </>
  );
}

const steps = [
  {
    title: "Collect the information throw your needs",
    description:
      "Set up web crawlers to collect real-time data on crop prices, market trends, and demand from sources like commodity exchanges, cooperatives, and agricultural websites.",
  },
  {
    title: "Predict your events and needs",
    description:
      "Create a database to store the collected data and train GPT-4 to analyze trends and changes in agricultural practices and policies.",
  },
  {
    title: "Get personalized recommendations",
    description:
      "Develop an algorithm that uses GPT-4's analysis to generate personalized recommendations for each farmer, helping them optimize their crop sales.",
  },
  {
    title: "Generate a user-friendly dashboard",
    description:
      "Implement a user-friendly interface where farmers can access real-time market data, connect with agricultural cooperatives, and participate in the centralized bidding system.",
  },
  {
    title: "5. Get output, and implement solutions",
    description:
      "Use Canva to design visually appealing reports and dashboards that display insights on market trends, cooperative connections, and bidding opportunities.",
  },
];
