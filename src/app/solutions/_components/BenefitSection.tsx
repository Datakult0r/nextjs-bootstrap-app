// import { IntroTitle } from "@/components/IntroTitle";
import { BenefitCard } from "./cards/BenefitCard";

const items = [
  {
    tag: "Lead Management",
    description: "Efficiently gather and organize leads through customizable forms, surveys, and landing pages.",
    thumbnail: "/image/thumbnail/collaborating.png",
  },
  {
    tag: "Marketing Automation",
    description: "Automate follow-ups via email, SMS, and social media to nurture leads and convert them into loyal customers.",
    thumbnail: "/image/thumbnail/people-brainstorming.png",
  },
  {
    tag: "Sales Funnel",
    description: "Design and implement high-converting sales funnels with an intuitive drag-and-drop interface.",
    thumbnail: "/image/thumbnail/futuristic-office.png",
  },
  {
    tag: "Appointment Scheduling",
    description: "Simplify booking processes with integrated calendars and automated reminders.",
    thumbnail: "/image/thumbnail/two-people-brainstorming.png",
  },
];

export function BenefitSection() {
  return (
    <section className="py-[72px]">
      <div className="container grid grid-cols-1 grid-rows-1 gap-y-[56px]">
        <div className="flex flex-col gap-x-10 gap-y-4 lg:flex-row lg:items-center lg:justify-between">
          {/* <IntroTitle
            align="left"
            heading="Why Choose GoHighLevel?"
            title="Experience the power of an all-in-one CRM solution"
            size="lg"
            className="max-w-[740px]"
          /> */}
          <p className="leading-6 tracking-[-0.16px] text-black/50 lg:max-w-[432px]">
            GoHighLevel consolidates essential marketing and sales tools into a single platform, offering comprehensive solutions for your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <BenefitCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
