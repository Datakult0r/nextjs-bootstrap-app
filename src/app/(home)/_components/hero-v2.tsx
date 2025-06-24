"use client";

import { cn } from "@/libs/utils";
import { BookingForm } from "@/components/common/booking-form";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
import { motion } from "framer-motion";

interface HeroProps {
  heading: string;
  paragraph: string;
  cta: {
    label: string;
    formId: string;
    formUrl: string;
  };
}

export function HeroV2(props: HeroProps) {
  return (
    <section className="relative min-h-[660px] w-full overflow-hidden rounded-lg border bg-gradient-to-br from-background to-background/50 sm:min-h-[540px]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 via-purple-500/10 to-blue-500/10 opacity-30" />
      </div>

      {/* Main content */}
      <div className="container relative z-10 flex min-h-[660px] items-center py-20 sm:min-h-[540px]">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-sm text-teal-500">
                <span className="mr-2 h-2 w-2 rounded-full bg-teal-500"></span>
                New: AI Performance Center
              </div>
            </motion.div>

            <motion.h1 
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {props.heading}
            </motion.h1>

            <motion.p 
              className="max-w-[554px] text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {props.paragraph}
            </motion.p>

            <motion.div 
              className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <BookingForm
                iframeUrl={props.cta.formUrl}
                iframeId={props.cta.formId}
              >
                <AnimatedArrowButton variant="default">
                  {props.cta.label}
                </AnimatedArrowButton>
              </BookingForm>
              
              <AnimatedArrowButton variant="outline">
                Watch Demo
              </AnimatedArrowButton>
            </motion.div>
          </div>

          {/* Right column - Stats */}
          <motion.div 
            className="grid grid-cols-2 gap-4 lg:grid-cols-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {[
              { label: "Active Users", value: "500+" },
              { label: "AI Solutions", value: "50+" },
              { label: "Success Rate", value: "95%" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-lg border bg-background/50 p-4 transition-colors hover:border-teal-500/50 hover:bg-background/80"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
