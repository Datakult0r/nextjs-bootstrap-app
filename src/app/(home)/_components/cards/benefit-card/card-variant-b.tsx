import Image from "next/image";
import { TitleBlock } from "@/components/common/title-block";
 
export type CardVariantBProps = {
  title: string;
  heading: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

export function CardVariantB(props: CardVariantBProps) {

  return (
    <div className="flex h-full w-full flex-col-reverse justify-between gap-y-10 rounded-lg bg-[#DC8100] p-6 text-white md:flex-row md:gap-y-0 lg:p-8">
      <div className="flex h-full max-w-[660px] flex-1 flex-col justify-between gap-y-10 md:gap-y-0 lg:pl-4">
        <TitleBlock
          {...props}
          align="left"
          size="lg"
          classNames={{
            title: "text-white/60"
          }}
        />

        <p className="font-sans leading-6 tracking-[-0.16px]">{props.description}</p>
      </div>

      <div className="relative mr-6 h-[240px] w-[240px] md:h-[290px] md:w-[290px]">
        <Image
          src={props.image.src}
          alt={props.image.alt}
          fill
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
