"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/libs/utils";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";

export interface IndustryCardProps {
  image: {
    src: string;
    alt: string;
  };
  heading: string;
  paragraph?: string;
  className?: string;
  href?: string;
  layout?: "default" | "loosed";
}

export function IndustryCard(props: IndustryCardProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <motion.div
      className={cn(
        "group relative h-[347px]  min-w-[255px] rounded-lg bg-slate-500",
        props.layout === "loosed" ? "h-[480px]" : "h-[347px]",
        props.className,
      )}
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
    >
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex"
          >
            <div
              className="pointer-events-none absolute h-full w-full rounded-[12px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(30, 41, 59, 0.60) 0%, #1E293B 100%)",
                opacity: 1,
              }}
            />
            <div className="flex h-full w-full flex-col justify-between pb-10 pl-5 pt-5">
              {props.paragraph && (
                <div className="flex flex-col gap-4">
                  <motion.h1
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    exit={{ y: 10 }}
                    className="z-10 flex w-fit items-center gap-[0.5ch] rounded-full bg-white/25 px-3 py-2 text-xs font-semibold capitalize text-white"
                  >
                    {props.heading}
                  </motion.h1>
                  <motion.p
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    exit={{ y: 10 }}
                    className={cn(
                      "z-10 font-semibold tracking-tighter text-white",
                      props.layout === "loosed"
                        ? "text-2xl"
                        : "text-sm leading-6 tracking-tight",
                    )}
                  >
                    {props.paragraph}
                  </motion.p>
                </div>
              )}

              <div className="flex h-fit flex-row items-center justify-between">
                <Link href={props.href || "#"} className="z-10 mr-5">
                  <AnimatedArrowButton
                    className="text-xs"
                    size={props.layout === "loosed" ? "default" : "sm"}
                  >
                    Learn more
                  </AnimatedArrowButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Image
        className="rounded-[12px]"
        fill
        src={props.image.src}
        alt={props.image.alt}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 355px"
        style={{
          objectFit: "cover",
        }}
      />
    </motion.div>
  );
}
