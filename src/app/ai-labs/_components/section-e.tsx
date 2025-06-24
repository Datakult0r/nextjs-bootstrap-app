import { DottedBackground } from "@/components/ui/animated-dotted-background";

interface SectionEProps {
  heading: string;
}

export function SectionE(props: SectionEProps) {
  return (
    <section className="relative w-full overflow-hidden border-y border-border">
      <div className="container relative mx-auto h-full border-x border-border">
        <DottedBackground>
          <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">
            <div className="ml-auto max-w-3xl">
              <h1 className="bg-background text-[2.5rem] leading-[1.2] tracking-tighter text-foreground">
                {props.heading}
              </h1>
            </div>
          </div>
        </DottedBackground>
      </div>
    </section>
  );
}
