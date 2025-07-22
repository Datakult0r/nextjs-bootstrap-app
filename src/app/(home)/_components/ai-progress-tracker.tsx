"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Target,
  Star,
} from "lucide-react"

export function AIProgressTracker() {
  const achievements = [
    {
      icon: Trophy,
      title: "AI Implementation Expert",
      description: "Successfully deployed 50+ AI solutions",
      progress: 85,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30"
    },
    {
      icon: Target,
      title: "Efficiency Master",
      description: "Achieved 95% automation rate",
      progress: 95,
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
      borderColor: "border-teal-500/30"
    },
    {
      icon: Star,
      title: "Innovation Pioneer",
      description: "Early adopter of cutting-edge AI",
      progress: 75,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    }
  ];

  const stats = [
    { label: "Projects Completed", value: "500+" },
    { label: "Success Rate", value: "95%" },
    { label: "Client Satisfaction", value: "4.9/5" },
    { label: "Team Size", value: "50+" }
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4">
              Your AI Journey
            </Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Track Your AI Implementation Progress
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Monitor your organization&apos;s AI transformation journey and unlock achievements as you progress.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, _index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: _index * 0.1 }}
            >
              <Card className="group relative overflow-hidden transition-all duration-300 hover:border-teal-500/50">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-purple-500/5 to-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center space-x-4">
                    <div className={`rounded-lg ${achievement.bgColor} p-2`}>
                      <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>

                  <Badge 
                    variant="outline" 
                    className={`mt-4 ${achievement.borderColor} ${achievement.color} ${achievement.bgColor}`}
                  >
                    {achievement.progress >= 100 ? 'Completed' : 'In Progress'}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="overflow-hidden border-2">
            <div className="grid gap-8 p-8 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, _index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
