import { cn } from "@/libs/utils";
import { TitleBlock } from "@/components/common/title-block";

export interface IntroCardProps {
  title: string;
  heading: string;
  description: string;
  className?: string;
}

export function IntroCard(props: IntroCardProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col justify-between space-y-20 rounded-lg bg-[#233171] p-8 text-white",
        props.className,
      )}
    >
      <TitleBlock
        {...props}
        align="left"
        size="md"
        className="max-w-[660px] py-0"
      />

      <p className="max-w-[660px] font-sans leading-6 tracking-[-0.16px]">
        {props.description}
      </p>
    </div>
  );
}
