import { Marquee } from "@/components/ui/marquee";
import { TitleBlock } from "@/components/common/title-block";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";

import { IndustryCard, IndustryCardProps } from "./cards/industry-card";
import { BookingForm } from "@/components/common/booking-form";
import config from "@/app/config";

interface IndustriesSectionProps {
  title: string;
  heading: string;
  paragraph: string;
  industries: IndustryCardProps[];
}

export function Industries(props: IndustriesSectionProps) {
  return (
    <section className="relative border-y border-border">
      <div className="container flex place-items-center border-x border-border pb-[72px] pt-[72px]">
        <div className="mx-auto max-w-[680px] space-y-8">
          <TitleBlock {...props} size="lg" />
          <p className="mx-auto max-w-[640px] text-center font-sans leading-6 tracking-[-0.16px] text-muted-foreground">
            {props.paragraph}
          </p>
        </div>
      </div>

      <div className="container overflow-x-hidden border-x border-border px-0 pb-[72px]">
        <Marquee className="w-full" pauseOnHover={true}>
          <div className="flex">
            {props.industries.map((industry, index) => (
              <div key={`industry-group-${index}`} className="flex">
                <div
                  className="min-w-[355px] px-2"
                >
                  <IndustryCard {...industry} layout="loosed" />
                </div>
                {(index + 1) % 3 === 0 && (
                  <div
                    className="h-auto min-w-[500px] px-2"
                  >
                    <CTACard />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}

function CTACard() {
  return (
    <div className="flex h-full w-[500px] min-w-[500px] flex-col justify-between gap-4 rounded-lg bg-navy px-8 py-10 text-navy-foreground">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl tracking-tight">
          Unlock the power of artificial intelligence for your business
        </h3>
        <p className="text-muted-foreground">
          The benefits our GenAI and LLM solutions can bring to various
          businesses are endless. Let us know if there are other problems we can
          help.
        </p>
      </div>
      <div>
        <BookingForm
          iframeUrl={config.bookings.discoveryCall.url}
          iframeId={config.bookings.discoveryCall.id}
        >
          <AnimatedArrowButton>Book Now</AnimatedArrowButton>
        </BookingForm>
      </div>
    </div>
  );
}
