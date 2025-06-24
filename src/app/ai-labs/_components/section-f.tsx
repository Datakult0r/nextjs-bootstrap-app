import { cn } from "@/libs/utils";
import { Badge } from "@/components/ui/badge";
import { DotPattern } from "@/components/ui/dot-pattern";
import { JellyfishPulsar } from "@/components/ui/jelly-fish-pulsar";

interface OptionProps {
  label: string;
  description: string;
  color: string;
}

interface SectionFProps {
  paragraphOne: string;
  paragraphTwo: string;
  options: OptionProps[];
}

export function SectionF(props: SectionFProps) {
  return (
    <section className="relative">
      <div className="container border-x border-border relative min-h-[80vh] py-16 sm:py-20 md:py-24 lg:py-32">
        {/* Top text */}
        <h2 className="mb-12 max-w-3xl text-2xl font-normal tracking-tight sm:mb-16 sm:text-3xl md:mb-20 md:text-4xl lg:mb-24">
          {props.paragraphOne}
        </h2>

        {/* Circular diagram */}
        <div className="relative mx-auto h-[600px] w-full max-w-4xl">
          <JellyfishPulsar />

          {/* Cards Container */}
          <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3">
            {/* Top Card - Center Top */}
            <div className="hidden lg:col-span-3 lg:row-start-1 lg:flex lg:items-start lg:justify-center lg:p-4">
              <Card {...props.options[0]} />
            </div>

            {/* Left Card - Center Left */}
            <div className="hidden lg:col-start-1 lg:row-start-2 lg:flex lg:items-center lg:justify-start lg:p-4">
              <Card {...props.options[1]} />
            </div>

            {/* Center Space - For Jellyfish */}
            <div className="hidden lg:col-start-2 lg:row-start-2 lg:block" />

            {/* Right Card - Center Right */}
            <div className="hidden lg:col-start-3 lg:row-start-2 lg:flex lg:items-center lg:justify-end lg:p-4">
              <Card {...props.options[2]} />
            </div>

            {/* Bottom Card - Center Bottom */}
            <div className="hidden lg:col-span-3 lg:row-start-3 lg:flex lg:items-end lg:justify-center lg:p-4">
              <Card {...props.options[3]} />
            </div>

            {/* Mobile Layout */}
            <div className="flex flex-col gap-4 p-4 lg:hidden">
              {props.options.map((option, index) => (
                <Card key={index} {...option} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <p className="ml-auto mt-12 max-w-xl text-lg font-normal sm:mt-16 sm:text-xl md:mt-20 md:text-2xl lg:mt-24">
          {props.paragraphTwo}
        </p>
      </div>
      <DotPattern className="[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]" />
    </section>
  );
}

function Card(props: OptionProps) {
  return (
    <div className={cn("relative z-[20] w-full rounded-lg bg-background p-4 lg:max-w-[280px]", props.color)}>
      <Badge className="mb-24 font-mono text-sm font-medium uppercase border border-white/40 bg-white/30 backdrop-blur-sm text-inherit">
        {props.label}
      </Badge>
      <p className="text-sm font-semibold">{props.description}</p>
    </div>
  );
}
