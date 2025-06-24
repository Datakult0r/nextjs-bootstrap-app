import { Separator } from "@/components/ui/separator";
import { TitleBlock } from "@/components/common/title-block";

interface Feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  heading: string;
  paragraph: string;
  iconBgColor: string;
  iconColor: string;
}

interface SolutionOverviewSectionProps {
  heading: string;
  title: string;
  paragraph: string;
  features: Feature[];
}

export function SolutionOverviewSection(props: SolutionOverviewSectionProps) {
  return (
    <>
      <div className="container mx-auto border-x border-border py-16 md:py-24">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="max-w-xl">
            <TitleBlock
              title={props.title}
              classNames={{
                container: "space-y-6 max-w-[500px]",
                title:
                  "bg-cyan-50 dark:bg-cyan-950 border-primary border text-cyan-500 w-fit rounded-full px-4 py-1.5",
              }}
              heading={props.heading}
              align="left"
              size="lg"
            />
            <p className="mt-8 leading-relaxed text-muted-foreground max-w-[450px]">
              {props.paragraph}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {props.features.map((feature, index) => (
              <div key={index} className="space-y-4">
                <div
                  className={`flex size-12 items-center justify-center rounded-md ${feature.iconBgColor}`}
                >
                  <div className={feature.iconColor}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="font-mono text-sm uppercase">
                  {feature.heading}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
}
