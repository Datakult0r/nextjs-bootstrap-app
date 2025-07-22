'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Code, Shield, Trophy, Users, Zap } from "lucide-react";
import { educationPaths } from "@/constants/nav-links";

const iconMap = {
  brain: Brain,
  code: Code,
  shield: Shield
};

const colorMap = {
  teal: {
    bg: "bg-teal-500/10",
    border: "border-teal-500/30",
    text: "text-teal-500",
    gradient: "from-teal-500 to-cyan-500"
  },
  blue: {
    bg: "bg-blue-500/10", 
    border: "border-blue-500/30",
    text: "text-blue-500",
    gradient: "from-blue-500 to-indigo-500"
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30", 
    text: "text-purple-500",
    gradient: "from-purple-500 to-pink-500"
  }
};

export function AIEducationPanel() {
  return (
    <div className="w-[600px] p-6">
      <div className="mb-6">
        <div className="mb-4 flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-teal-500 to-purple-500" />
          <h3 className="text-lg font-semibold text-foreground">AI Learning Paths</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Master AI through gamified virtual worlds with blockchain-verified credentials
        </p>
      </div>

      <div className="space-y-4">
        {educationPaths.map((path, index) => {
          const IconComponent = iconMap[path.icon as keyof typeof iconMap];
          const colors = colorMap[path.color as keyof typeof colorMap];
          const totalProgress = path.modules.reduce((sum, module) => sum + module.progress, 0) / path.modules.length;

          return (
            <motion.div
              key={path.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`group border-2 ${colors.border} ${colors.bg} backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`rounded-full bg-gradient-to-r ${colors.gradient} p-3 shadow-lg`}>
                      {IconComponent && <IconComponent className="h-6 w-6 text-white" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {path.name}
                        </h4>
                        <Badge variant="outline" className={`${colors.text} border-current`}>
                          {path.difficulty}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {path.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Overall Progress</span>
                          <span className="text-xs font-medium">{Math.round(totalProgress)}%</span>
                        </div>
                        <Progress value={totalProgress} className="h-2" />
                      </div>

                      {/* Modules */}
                      <div className="space-y-1">
                        {path.modules.map((module, moduleIndex) => (
                          <div key={moduleIndex} className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{module.name}</span>
                            <div className="flex items-center space-x-1">
                              {module.progress > 0 && (
                                <Trophy className="h-3 w-3 text-yellow-500" />
                              )}
                              <span className={module.progress > 0 ? "text-green-500" : "text-muted-foreground"}>
                                {module.progress}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Link
                        href={path.href}
                        className={`mt-3 inline-flex items-center text-sm font-medium ${colors.text} hover:underline`}
                      >
                        Enter Virtual World →
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Gamification Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 grid grid-cols-3 gap-3"
      >
        <Card className="border-yellow-500/30 bg-yellow-500/5 p-3 text-center">
          <Trophy className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
          <div className="text-xs font-medium">BNS Credentials</div>
          <div className="text-xs text-muted-foreground">Blockchain Verified</div>
        </Card>
        
        <Card className="border-green-500/30 bg-green-500/5 p-3 text-center">
          <Users className="h-5 w-5 text-green-500 mx-auto mb-1" />
          <div className="text-xs font-medium">Community</div>
          <div className="text-xs text-muted-foreground">Learn Together</div>
        </Card>
        
        <Card className="border-blue-500/30 bg-blue-500/5 p-3 text-center">
          <Zap className="h-5 w-5 text-blue-500 mx-auto mb-1" />
          <div className="text-xs font-medium">3D Worlds</div>
          <div className="text-xs text-muted-foreground">Immersive Learning</div>
        </Card>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-center"
      >
        <Link
          href="/cerebro"
          className="inline-flex items-center rounded-md bg-gradient-to-r from-teal-500 to-purple-500 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:scale-105"
        >
          Explore Europa.exe Metaverse
        </Link>
      </motion.div>
    </div>
  );
} 