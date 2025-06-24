import { cn } from "@/libs/utils";
import { BookingForm } from "@/components/common/booking-form";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
import Link from "next/link";

interface HeroProps {
  heading: string;
  paragraph: string;
  cta: {
    label: string;
    formId: string;
    formUrl: string;
  };
}

export function Hero(props: HeroProps) {
  return (
    <section className="relative flex h-[660px] w-full items-center justify-center overflow-hidden rounded-lg border sm:h-[540px]">
      <div className="container">
        <div className="grid h-fit w-full gap-10 lg:grid-cols-2">
          <h1 className="max-w-[572px] text-[40px] leading-[48px] tracking-[-2px]">
            {props.heading}
          </h1>
          <div className="space-y-12">
            <p className="prose max-w-[554px] text-muted-foreground">
              {props.paragraph}
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <BookingForm
                iframeUrl={props.cta.formUrl}
                iframeId={props.cta.formId}
              >
                <AnimatedArrowButton>{props.cta.label}</AnimatedArrowButton>
              </BookingForm>
              
              <a href="/overview.html" className="block">
                <AnimatedArrowButton>View Gamefiction Commands</AnimatedArrowButton>
              </a>
            </div>
          </div>
        </div>
      </div>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
    </section>
  );
}
