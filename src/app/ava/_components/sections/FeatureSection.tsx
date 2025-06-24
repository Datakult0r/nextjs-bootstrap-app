"use client";
import { TitleBlock } from "@/components/common/title-block";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";

interface FeatureSectionProps {
  title: string;
  heading: string;
  description: string;
  items: Array<{
    label: string;
    description: string;
  }>;
}

export function FeatureSection(props: FeatureSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const yOffset = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.8 }}
      viewport={{ margin: "0px 0px -100px 0px" }}
      className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
    >
      <motion.div 
        className="mb-16 text-center"
        style={{ y: yOffset }}
      >
        <TitleBlock
          title={props.title}
          heading={props.heading}
          align="center"
        />
      </motion.div>

      <AnimatePresence>
        <motion.div 
          className="grid divide-x divide-y border border-border md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ amount: 0.2 }}
          variants={{
            visible: { 
              transition: { 
                staggerChildren: 0.1,
                staggerDirection: 1 
              } 
            },
            hidden: { 
              transition: { 
                staggerChildren: 0.1,
                staggerDirection: -1 
              } 
            }
          }}
        >
          {props.items.map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ 
                type: "spring", 
                stiffness: 120,
                damping: 20,
                mass: 0.5
              }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className={`space-y-20 px-8 py-8 ${index === props.items.length - 2 ? "md:col-span-2" : ""}`}
            >
              <motion.div
                className={`inline-block rounded-full bg-teal-subtle px-4 py-2 font-mono text-sm font-medium uppercase text-teal-subtle-foreground`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {stat.label}
              </motion.div>
              <motion.p 
                className="text-lg text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                {stat.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
