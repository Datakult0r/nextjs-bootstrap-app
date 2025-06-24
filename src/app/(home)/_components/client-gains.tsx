import { PillBottle, Handshake, ShieldCheck, Calendar } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TitleBlock } from "@/components/common/title-block";

interface ClientGainsProps {
  title: string;
  heading: string;
  videosrc: string;
  benefits: {
    label: string;
  }[];
}

export function ClientGains(props: ClientGainsProps) {
  return (
    <section className=" font-sans border-y border-border">
      <div className="container border-x border-border py-8 space-y-6 ">
        <div className="flex w-full flex-col-reverse gap-4 lg:flex-row">
          <div className="pt-6 lg:my-auto lg:flex-1">
            <TitleBlock {...props} size="lg" align="left" />
            <div className="mt-6 flex flex-wrap gap-4">
              {props.benefits.map((benefit) => (
                <Badge
                  key={benefit.label}
                  variant="secondary"
                  className="flex items-center gap-x-2 px-4 py-2"
                >
                  {benefit.label === "Transparent partnership" && (
                    <Handshake strokeWidth="1.5" className="size-5" />
                  )}
                  {benefit.label === "No hidden fees" && (
                    <PillBottle strokeWidth="1.5" className="size-5" />
                  )}
                  {benefit.label === "Pragmatic approach" && (
                    <ShieldCheck strokeWidth="1.5" className="size-5" />
                  )}
                  {benefit.label === "Results guaranteed in 15 days" && (
                    <Calendar strokeWidth="1.5" className="size-5" />
                  )}
                  <span className="whitespace-nowrap leading-6 tracking-[-0.16px]">
                    {benefit.label}
                  </span>
                </Badge>
              ))}
            </div>
          </div>

          <div className="relative h-[380px] w-full rounded-lg bg-muted lg:h-[460px] lg:w-[460px] xl:w-[560px]">
            <video
              src={props.videosrc}
              className="h-full w-full rounded-lg object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
}
