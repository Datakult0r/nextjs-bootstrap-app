"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
import { BookingForm } from "@/components/common/booking-form";
import { 
  Brain, 
  Zap, 
  Target, 
  Users, 
  Cpu,
} from "lucide-react";

interface Solution {
  title: string;
  heading: string;
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
  stats?: {
    completion: number;
    users: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
  };
  features?: string[];
}

interface AISolutionsGamifiedProps {
  title: string;
  heading: string;
  solutions: Solution[];
}

const iconMap = {
  "AI powered virtual assistants.": Brain,
  "AI Workflow Automation": Zap,
  "Value Chain Analysis": Target,
  "Education & Consultancy": Users,
};

const difficultyColors = {
  Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function AISolutionsGamified({ title, heading, solutions }: AISolutionsGamifiedProps) {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4 border-teal-500/30 text-teal-500">
              {title}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {heading}
            </h2>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {solutions.map((solution, index) => {
            const Icon = iconMap[solution.title as keyof typeof iconMap] || Cpu;
            
            return (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden border-2 transition-all duration-300 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/10">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-purple-500/5 to-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                  
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-teal-500/10 p-2">
                          <Icon className="h-6 w-6 text-teal-500" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{solution.heading}</CardTitle>
                          {solution.stats && (
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge 
                                variant="outline" 
                                className={difficultyColors[solution.stats.difficulty]}
                              >
                                {solution.stats.difficulty}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {solution.stats.users} users
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative space-y-6">
                    <CardDescription className="text-base">
                      {solution.paragraph}
                    </CardDescription>

                    {/* Progress indicator */}
                    {solution.stats && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Implementation Progress</span>
                          <span className="font-medium">{solution.stats.completion}%</span>
                        </div>
                        <Progress value={solution.stats.completion} className="h-2" />
                      </div>
                    )}

                    {/* Features list */}
                    {solution.features && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Key Features:</h4>
                        <ul className="space-y-1">
                          {solution.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-muted-foreground">
                              <div className="mr-2 h-1.5 w-1.5 rounded-full bg-teal-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex space-x-3 pt-4">
                      <BookingForm
                        iframeUrl={solution.cta.formUrl}
                        iframeId={solution.cta.formId}
                      >
                        <AnimatedArrowButton variant="default" size="sm">
                          {solution.cta.label}
                        </AnimatedArrowButton>
                      </BookingForm>
                      
                      <AnimatedArrowButton variant="ghost" size="sm">
                        View Details
                      </AnimatedArrowButton>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="rounded-lg border bg-gradient-to-r from-teal-500/10 via-purple-500/10 to-blue-500/10 p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business with AI?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join hundreds of companies already leveraging our AI solutions to boost productivity and drive innovation.
            </p>
            <div className="flex justify-center space-x-4">
              <AnimatedArrowButton variant="default">
                Start Your AI Journey
              </AnimatedArrowButton>
              <AnimatedArrowButton variant="outline">
                Schedule Consultation
              </AnimatedArrowButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
