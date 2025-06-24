import { TitleBlock } from "@/components/common/title-block";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContactFormSectionProps {
  heading: string;
  paragraph: string;
  form: React.ReactNode;
}

export function ContactFormSection(props: ContactFormSectionProps) {
  return (
    <section className="h-screen">
      <div className="container grid grid-cols-1 gap-12 lg:grid-cols-2 h-full">
        <div className="space-y-8 pt-24 lg:py-32">
          <TitleBlock title="Contact Us" heading={props.heading} align="left" />
          <p className="max-w-[400px] text-muted-foreground">
            {props.paragraph}
          </p>
        </div>

        <ScrollArea className="h-full w-full">{props.form}</ScrollArea>
      </div>
    </section>
  );
}
