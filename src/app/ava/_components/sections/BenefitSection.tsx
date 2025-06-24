"use client";

import { TitleBlock } from "@/components/common/title-block";
import { BenefitCard } from "../cards/BenefitCard";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface BenefitSectionProps {
  title: string;
  heading: string;
  description: string;
  items: Array<{
    label: string;
    title: string;
    imgSrc: string;
  }>;
}

export function BenefitSection(props: BenefitSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yCards = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <motion.section
      ref={ref}
      className="overflow-hidden py-[48px] md:py-[72px] lg:min-h-[80vh]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      viewport={{ amount: 0.2 }}
    >
      <div className="container grid grid-cols-1 grid-rows-1 gap-y-[32px] md:gap-y-[56px]">
        <motion.div
          className="flex flex-col gap-x-10 gap-y-4 lg:flex-row lg:items-center lg:justify-between"
          style={{ y: yText }}
        >
          <TitleBlock
            align="left"
            title={props.title}
            heading={props.heading}
            size="lg"
            classNames={{
              container: "max-w-[740px]",
            }}
          />
          <p className="leading-6 tracking-[-0.16px] text-foreground lg:max-w-[432px]">
            {props.description}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-[12px] md:grid-cols-2 xl:grid-cols-4"
          style={{ y: yCards }}
        >
          <AnimatePresence>
            {props.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                viewport={{ amount: 0.2 }}
              >
                <BenefitCard {...item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}
