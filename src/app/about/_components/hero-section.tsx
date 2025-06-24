import { Globe } from "@/components/ui/globe";

interface HeroSectionProps {
  avatarUrls: string[];
  heading: string;
  paragraph: string;
}

export function HeroSection(props: HeroSectionProps) {
  return (
    <div className="h-fit overflow-hidden bg-background text-foreground border-b border-border">
      <div className="container border-x border-border flex w-full flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-4 py-16 lg:pl-10">
          <h2 className="text-3xl tracking-tighter">
            {props.heading}
          </h2>
          <p className="md:text- leading-6 text-foreground/60">
            {props.paragraph}
          </p>
        </div>
        <div className="relative hidden h-[400px] flex-1 lg:block">
          <Globe className="absolute inset-0" />
        </div>
      </div>
    </div>
  );
}
