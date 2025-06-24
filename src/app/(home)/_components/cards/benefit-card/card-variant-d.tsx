import { TitleBlock } from "@/components/common/title-block";
 
export interface CardVariantDProps {
  title: string;
  heading: string;
  description: string;
}

export function CardVariantD(props: CardVariantDProps) {
  return (
    <div className="flex h-full w-full flex-col justify-between space-y-20 rounded-lg bg-navy p-8 text-navy-foreground">
      <TitleBlock
        {...props}
        align="left"
        size="lg"
        classNames={{
          title: "text-white/60"
        }}
      />


      <p className="max-w-[660px] leading-6 tracking-[-0.16px]">
        {props.description}
      </p>
    </div>
  );
}
