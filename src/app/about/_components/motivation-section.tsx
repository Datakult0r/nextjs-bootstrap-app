import { HoveringQuoteMark } from "@/components/ui/hovering-quote-mark";

interface MotivationSectionProps {
  heading: string;
  paragraph: string;
}

export function MotivationSection(props: MotivationSectionProps) {
  return (
    <div className="bg-navy py-28 text-center text-navy-foreground">
      <div className="container flex gap-3 lg:flex-row">
        <HoveringQuoteMark />
        <div className="space-y-6">
          <h2 className="text-3xl tracking-tighter sm:text-4xl">
            {props.heading}
          </h2>

          <p className="mx-auto max-w-3xl text-lg">{props.paragraph}</p>
        </div>
        <HoveringQuoteMark />
      </div>
    </div>
  );
}
