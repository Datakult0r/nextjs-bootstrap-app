import { TitleBlock } from "@/components/common/title-block";
import { MethodCard } from "../cards/MethodCard";
import { BookingForm } from "@/components/common/booking-form";
import { Settings2, Brain, Timer, Bolt } from "lucide-react";

interface MethodSectionProps {
  title: string;
  heading: string;
  description: string;
  cta: {
    label: string;
    formId: string;
    formUrl: string;
  };
  items: Array<{
    label: string;
    description: string;
    icon: string;
    className: string;
  }>;
}

const iconMap: Record<string, React.ReactNode> = {
  settings: <Settings2 className="h-6 w-6 text-black" />,
  brain: <Brain className="h-6 w-6" />,
  timer: <Timer className="h-6 w-6" />,
  bolt: <Bolt className="h-6 w-6 text-black" />,
};

export function MethodSection(props: MethodSectionProps) {
  return (
    <section className="py-[48px] md:py-[72px] lg:min-h-[80vh] mt-[-32px] md:mt-0">
      <div className="container grid grid-cols-1 grid-rows-1 gap-y-[32px] md:gap-y-[56px]">
        <div className="flex flex-col gap-x-10 gap-y-4 lg:flex-row lg:items-center lg:justify-between">
          <TitleBlock
            align="left"
            title={props.title}
            heading={props.heading}
            size="lg"
            classNames={{
              container: "max-w-[740px]"
            }}
          />
          <BookingForm
            iframeUrl={props.cta.formUrl}
            iframeId={props.cta.formId}
          >
            <button className="w-fit rounded-full bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/80">
              {props.cta.label}
            </button>
          </BookingForm>
        </div>

        <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 xl:grid-cols-4">
          {props.items.map(({ className, icon, ...item }, index) => (
            <MethodCard
              key={index}
              className={className}
              content={{
                ...item,
                icon: iconMap[icon] || <Bolt className="h-6 w-6" />
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
