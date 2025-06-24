import Image from "next/image";

export interface CardVariantCProps {
  heading: string;
  title: string;
  description: string;
  image: {
    url: string;
    alt: string;
  }
}

export function CardVariantC(props: CardVariantCProps) {

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-[#E0E8EB] p-4 text-slate-950 md:flex-row">
      <div className="relative h-[280px] w-full rounded-lg bg-gray-200 sm:h-[380px] md:h-full md:w-[312px]">
        <Image
          fill
          src={props.image.url}
          alt={props.image.alt}
          className="h-full w-full rounded-lg object-cover"
        />
      </div>

      <div className="flex h-full flex-1 flex-col justify-between px-4 py-6 lg:py-10 lg:pl-8">
        <div className="max-w-[660px] space-y-2">
          <h2 className="font-mono text-sm uppercase text-slate-950/40 sm:text-base">
            {props.heading}
          </h2>

          <p className="font-sans text-3xl leading-[40px] -tracking-[1.6px]">
            {props.title}
          </p>
        </div>

        <p className="mt-4 font-sans text-sm leading-6 tracking-[-0.16px] sm:text-base lg:mt-0">
          {props.description}
        </p>
      </div>
    </div>
  );
}
