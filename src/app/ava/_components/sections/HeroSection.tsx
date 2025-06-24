"use client";
import Image from "next/image";
import { TitleBlock } from "@/components/common/title-block";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
import { BookingForm } from "@/components/common/booking-form";
import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  heading: string;
  paragraph: string;
  image: string;
  cta: {
    label: string;
    formId: string;
    formUrl: string;
  };
}

export function HeroSection(props: HeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative h-[740px] w-full bg-[#ccd7db]"
    >
      <div className="h-full w-full">
        <Image
          fill
          alt=""
          src={props.image}
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/80">
        <div className="container mx-auto flex h-full flex-col items-center justify-center gap-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <TitleBlock
              title={props.title}
              heading={props.heading}
              size="lg"
              classNames={{
                container: "max-w-[740px] text-white",
                title: "text-white/60",
              }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mx-auto max-w-[665px] text-center text-lg leading-7 text-white/70"
            >
              {props.paragraph}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1, type: "spring" }}
          >
            <BookingForm
              iframeUrl={props.cta.formUrl}
              iframeId={props.cta.formId}
            >
              <AnimatedArrowButton>{props.cta.label}</AnimatedArrowButton>
            </BookingForm>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
