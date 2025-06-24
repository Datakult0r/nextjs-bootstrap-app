"use client";

import { TitleBlock } from "@/components/common/title-block";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface IntroductionProps {
  title: string;
  heading: string;
  paragraph: string;
  video: {
    src: string;
    thumbnail: string;
    alt: string;
  };
}

export function IntroductionSection(props: IntroductionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yOffset = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      className="py-[72px] overflow-hidden"
    >
      <div className="container grid grid-cols-1 grid-rows-1 gap-y-[56px]">
        <motion.div 
          className="flex flex-col gap-x-10 gap-y-4 lg:flex-row lg:items-center lg:justify-between"
          style={{ y: yOffset }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
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
          </motion.div>
          
          <motion.p 
            className="leading-6 tracking-[-0.16px] text-foreground lg:max-w-[432px]"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {props.paragraph}
          </motion.p>
        </motion.div>

        <motion.div 
          className="relative overflow-hidden rounded-[12px]"
          style={{ scale: scaleProgess }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <HeroVideoDialog
            className="block"
            animationStyle="top-in-bottom-out"
            videosrc={props.video.src}
            thumbnailSrc={props.video.thumbnail}
            thumbnailAlt={props.video.alt}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
