"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { TitleBlock } from "@/components/common/title-block";

const DynamicMarquee = dynamic(
  () => import("@/components/ui/marquee").then((mod) => mod.Marquee),
  {
    loading: () => (
      <div className="h-[300px] w-full animate-pulse rounded-lg bg-gray-200" />
    ),
  },
);

interface OurPartnersProps {
  title: string;
  heading: string;
  paragraph: string;
  partners: string[];
}

export function OurPartners(props: OurPartnersProps) {
  return (
    <section className="space-y-10 py-8 px-8">
      <div className="container bg-secondary py-10 rounded-lg flex w-full flex-col gap-x-[50px] lg:gap-x-[100px] gap-y-[50px] sm:flex-row">
        <div className="max-w-[580px] space-y-8">
          <TitleBlock {...props} size="lg" className="pb-0" align="left" />
          <p className="max-w-[640px] text-secondary-foreground">{props.paragraph}</p>
        </div>

        <div className="relative flex sm:h-[400px] h-[300px] w-full flex-row items-center justify-center gap-x-[40px] overflow-hidden rounded-lg md:w-[500px]">
          <DynamicMarquee pauseOnHover vertical className="[--duration:30s]">
            {props.partners.map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="relative h-14 w-[162px] px-4"
              >
                <Image
                  fill
                  src={logo}
                  alt="Partner logo"
                  sizes="(max-width: 768px) 162px, 162px"
                  className="object-contain"
                />
              </div>
            ))}
          </DynamicMarquee>
          <DynamicMarquee
            reverse
            pauseOnHover
            vertical
            className="[--duration:30s] sm:hidden lg:inline-block"
          >
            {props.partners.map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="relative h-14 w-[162px] px-4"
              >
                <Image
                  fill
                  src={logo}
                  alt="Partner logo"
                  sizes="(max-width: 768px) 162px, 162px"
                  className="object-contain"
                />
              </div>
            ))}
          </DynamicMarquee>
        </div>
      </div>
    </section>
  );
}
