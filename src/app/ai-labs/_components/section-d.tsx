import { TitleBlock } from "@/components/common/title-block";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
import { BookingForm } from "@/components/common/booking-form";

interface SectionDProps {
  title: string;
  heading: string;
  videosrc: string;
  cta: {
    label: string;
    formId: string;
    formUrl: string;
  };
}

export function SectionD(props: SectionDProps) {
  return (
    <section className="relative h-[400px] w-full overflow-hidden bg-muted lg:h-[480px]">
      <video
        src={props.videosrc}
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/70">
        <div className="container flex h-full flex-col items-center justify-center gap-8">
          <TitleBlock
            {...props}
            size="md"
            classNames={{
              container: "max-w-[740px] text-white mx-auto",
              title: "text-white/60",
            }}
          />
          <BookingForm
            iframeUrl={props.cta.formUrl}
            iframeId={props.cta.formId}
          >
            <AnimatedArrowButton className="w-fit rounded-full">
              {props.cta.label}
            </AnimatedArrowButton>
          </BookingForm>
        </div>
      </div>
    </section>
  );
}
