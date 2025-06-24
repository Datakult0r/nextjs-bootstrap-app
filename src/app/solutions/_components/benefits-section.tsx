import Image from "next/image"
import { TitleBlock } from "@/components/common/title-block";
import { Badge } from "@/components/ui/badge";

interface Benefit {
  title: string;
}

interface BenefitsProps {
  title: string;
  heading: string;
  paragraph: string;
  benefits: Benefit[];
}

interface BenefitCardProps {
  title: string;
}

export function BenefitsSection(props: BenefitsProps) {
  return (
    <section className="border-y border-border">
      <div className="container py-12">
        <TitleBlock heading={props.heading} title={props.title} />
        <p className="mx-auto mb-20 max-w-3xl text-center text-muted-foreground">
          {props.paragraph}
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {props.benefits.map((benefit, index) => (
            <BenefitCard key={index} title={benefit.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCard(props: BenefitCardProps) {
  return (
    <div className="flex flex-col aspect-[1.2/1.5] rounded-xl border border-border p-2">
      <div className="relative w-full h-full rounded-md overflow-hidden flex-1">
        <Image
          fill
          src="https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/678aa38c36fbb617438b2f3d.png"
          alt="Benefit illustration"
          className="object-cover rounded-lg"
        />
      </div>
      <div className="space-y-4 p-4">
        <Badge variant="secondary" className="font-mono uppercase font-normal">Automation</Badge>
        <h2 className="text-xl tracking-tighter">{props.title}</h2>
      </div>
    </div>
  );
}
