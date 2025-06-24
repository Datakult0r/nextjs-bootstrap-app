import Image from "next/image";
import { cn } from "@/libs/utils";

type MethodCardProps = {
  content: {
    label: string;
    description: string;
    icon: React.ReactNode;
  };
  className?: string;
};

export function MethodCard(props: MethodCardProps) {
  const { content, className } = props;

  return (
    <div
      className={cn(
        "space-y-[64px] rounded-xl bg-slate-800 p-6 text-white",
        className,
      )}
    >
      <div className="space-y-3">
        <div className="flex h-16 w-20 items-center justify-center rounded-xl bg-white">
          {content.icon}
        </div>

        <h2 className="font-mono uppercase">{content.label}</h2>
      </div>

      <h3 className="pb-4 text-2xl leading-8 tracking-[-1.2px]">
        {content.description}
      </h3>
    </div>
  );
}
