import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useScreenSize } from "@/hooks/useScreenSize";
import { cn } from "@/libs/utils";
import { BookingForm } from "@/components/common/booking-form";

export type SolutionContent = {
  heading: string;
  title: string;
  paragraph: string;
  image: {
    src: string;
    alt: string;
  };
  color: string;
  cta: {
    label: string;
    formId: string;
    formUrl: string;
  };
};

type SolutionCardProps = {
  content: SolutionContent;
  isHovered: boolean;
  onMouseEnter: () => void;
};

export function SolutionCard(props: SolutionCardProps) {
  const { content, isHovered, onMouseEnter } = props;

  const isLargeScreen = useScreenSize();

  return (
    <motion.div
      className={`group flex flex-col gap-y-8 rounded-lg bg-background p-4 transition-all duration-300 ease-out lg:flex-row-reverse lg:justify-between`}
      onMouseEnter={onMouseEnter}
      animate={{
        flex: isHovered ? 2 : 1,
      }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
    >
      <motion.div
        className="relative h-[302px] w-full overflow-hidden rounded-lg lg:h-[457px]"
        animate={{
          width: isLargeScreen ? (isHovered ? "320px" : "0px") : "100%",
        }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
      >
        <Image
          fill
          priority
          src={content.image.src}
          alt={content.image.alt}
          className="object-cover object-left"
        />
      </motion.div>

      <div className="space-y-4 px-2 lg:flex lg:flex-1 lg:flex-col lg:justify-between">
        <div className="space-y-6 pt-10 lg:space-y-10">
          <div className="space-y-2">
            <h2 className="font-mono text-sm uppercase text-foreground/40">
              {content.title}
            </h2>
            <p className="text-3xl leading-[40px] -tracking-[1.6px] text-foreground">
              {content.heading}
            </p>
          </div>
        </div>

        <div className="space-y-14 pb-10 lg:space-y-6">
          <p className="text-sm leading-6">{content.paragraph}</p>
          <BookingForm
            iframeUrl={content.cta.formUrl}
            iframeId={content.cta.formId}
          >
            <Button className={cn("rounded-full", content.color)}>
              {content.cta.label}
            </Button>
          </BookingForm>
        </div>
      </div>
    </motion.div>
  );
}
