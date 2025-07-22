"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
import { 
  FloatingParticles,
  GlitchText, 
  HolographicBorder, 
  NeonGlow,
  RevealAnimation,
  TypewriterText
} from "@/components/animations/floating-elements";
import { 
  Clock, 
  Star, 
  Target,
  Brain,
  Users,
  Award,
  Rocket
} from 'lucide-react';
import Link from "next/link";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: number;
  progress: number;
  rating: number;
  enrolled: number;
  category: string;
  skills: string[];
  prerequisites: string[];
  outcomes: string[];
  instructor: {
    name: string;
    avatar: string;
    title: string;
  };
  thumbnail: string;
  price: number;
  originalPrice?: number;
  isPopular?: boolean;
  isNew?: boolean;
}

const learningPaths: LearningPath[] = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    description: "Master the basics of artificial intelligence and machine learning concepts",
    level: "Beginner",
    duration: "4 weeks",
    modules: 8,
    progress: 65,
    rating: 4.8,
    enrolled: 2500,
    category: "AI",
    skills: ["Machine Learning", "Data Analysis", "Python", "AI Ethics"],
    prerequisites: [],
    outcomes: ["Understanding AI", "Data Analysis", "Python Programming", "AI Ethics"],
    instructor: {
      name: "John Doe",
      avatar: "/john-doe.jpg",
      title: "AI Researcher"
    },
    thumbnail: "/ai-fundamentals.jpg",
    price: 100,
    originalPrice: 120,
    isPopular: true,
    isNew: true
  },
  {
    id: "chatbot-development",
    title: "AI Chatbot Development",
    description: "Build intelligent conversational AI systems and virtual assistants",
    level: "Intermediate",
    duration: "6 weeks",
    modules: 12,
    progress: 40,
    rating: 4.9,
    enrolled: 1800,
    category: "AI",
    skills: ["NLP", "Conversational AI", "API Integration", "Bot Framework"],
    prerequisites: ["AI Fundamentals"],
    outcomes: ["Building AI Chatbots", "Advanced NLP", "API Integration", "Bot Framework"],
    instructor: {
      name: "Jane Smith",
      avatar: "/jane-smith.jpg",
      title: "AI Engineer"
    },
    thumbnail: "/chatbot-development.jpg",
    price: 150,
    originalPrice: 180,
    isPopular: true,
    isNew: true
  },
  {
    id: "data-science",
    title: "AI Data Science",
    description: "Learn to extract insights from data using advanced AI techniques",
    level: "Advanced",
    duration: "8 weeks",
    modules: 16,
    progress: 25,
    rating: 4.7,
    enrolled: 1200,
    category: "AI",
    skills: ["Deep Learning", "Neural Networks", "TensorFlow", "Data Visualization"],
    prerequisites: ["AI Fundamentals"],
    outcomes: ["Deep Learning", "Neural Networks", "TensorFlow", "Data Visualization"],
    instructor: {
      name: "Alice Johnson",
      avatar: "/alice-johnson.jpg",
      title: "Data Scientist"
    },
    thumbnail: "/data-science.jpg",
    price: 200,
    originalPrice: 250,
    isPopular: true,
    isNew: true
  },
  {
    id: "automation-specialist",
    title: "AI Automation Specialist",
    description: "Automate business processes using intelligent AI workflows",
    level: "Intermediate",
    duration: "5 weeks",
    modules: 10,
    progress: 0,
    rating: 4.6,
    enrolled: 950,
    category: "AI",
    skills: ["Process Automation", "RPA", "Workflow Design", "Integration"],
    prerequisites: ["AI Fundamentals"],
    outcomes: ["Process Automation", "RPA", "Workflow Design", "Integration"],
    instructor: {
      name: "Bob Brown",
      avatar: "/bob-brown.jpg",
      title: "AI Automation Engineer"
    },
    thumbnail: "/automation-specialist.jpg",
    price: 120,
    originalPrice: 150,
    isPopular: true,
    isNew: true
  }
];

const difficultyColors: Record<string, string> = {
  Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function AILearningPaths() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <FloatingParticles count={25} color="#00ffff" size={2} speed={0.2} />
      
      <div className="container relative z-10">
        <div className="mb-16 text-center">
          <RevealAnimation direction="up" delay={0.1}>
            <Badge variant="outline" className="mb-4 border-cyan-500/30 text-cyan-400">
              <Rocket className="mr-1 h-3 w-3" />
              Learning Paths
            </Badge>
            <GlitchText className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Master AI Skills Through Structured Learning
            </GlitchText>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              <TypewriterText 
                text="Choose your path and advance your AI expertise with hands-on projects and real-world applications."
                speed={25}
              />
            </p>
          </RevealAnimation>
        </div>

        {/* Stats Overview */}
        <RevealAnimation direction="up" delay={0.3} className="mb-12">
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <NeonGlow color="#00ffff" intensity={0.5}>
              <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-transparent text-center">
                <CardContent className="p-6">
                  <Target className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-cyan-400">4</div>
                  <div className="text-sm text-muted-foreground">Learning Paths</div>
                </CardContent>
              </Card>
            </NeonGlow>

            <NeonGlow color="#10B981" intensity={0.5}>
              <Card className="border-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent text-center">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">6K+</div>
                  <div className="text-sm text-muted-foreground">Active Learners</div>
                </CardContent>
              </Card>
            </NeonGlow>

            <NeonGlow color="#8B5CF6" intensity={0.5}>
              <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-transparent text-center">
                <CardContent className="p-6">
                  <Award className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">4.8</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </CardContent>
              </Card>
            </NeonGlow>
          </div>
        </RevealAnimation>

        <div className="grid gap-6 md:grid-cols-2">
          {learningPaths.map((path, index) => (
            <RevealAnimation
              key={path.id}
              direction="up"
              delay={0.1 * index}
            >
              <HolographicBorder 
                glowColor={path.level === "Beginner" ? "#3B82F6" : 
                          path.level === "Intermediate" ? "#14B8A6" : "#8B5CF6"} 
                animated={true}
                className="h-full"
              >
                <Card className="group relative h-full overflow-hidden border-2 transition-all duration-300 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-purple-500/5 to-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                  
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <NeonGlow color={path.level === "Beginner" ? "#3B82F6" : 
                                        path.level === "Intermediate" ? "#14B8A6" : "#8B5CF6"} 
                                 intensity={0.8}>
                          <div className={`rounded-lg ${path.level === "Beginner" ? "bg-green-500/10" : path.level === "Intermediate" ? "bg-yellow-500/10" : "bg-purple-500/10"} p-2`}>
                            <Brain className={`h-6 w-6 ${path.level === "Beginner" ? "text-green-400" : path.level === "Intermediate" ? "text-yellow-400" : "text-purple-400"}`} />
                          </div>
                        </NeonGlow>
                        <div>
                          <CardTitle className="text-xl">{path.title}</CardTitle>
                          <div className="mt-2 flex items-center space-x-2">
                            <Badge 
                              variant="outline" 
                              className={difficultyColors[path.level]}
                            >
                              {path.level}
                            </Badge>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{path.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative space-y-6">
                    <CardDescription className="text-base">
                      {path.description}
                    </CardDescription>

                    {/* Course stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="flex items-center justify-center space-x-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{path.duration}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center space-x-1">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{path.modules}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Modules</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center space-x-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{path.enrolled}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Enrolled</div>
                      </div>
                    </div>

                    {/* Progress (if enrolled) */}
                    {path.progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Your Progress</span>
                          <span className="font-medium">{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>
                    )}

                    {/* Skills */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Skills You&apos;ll Learn:</h4>
                      <div className="flex flex-wrap gap-2">
                        {path.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex space-x-3 pt-4">
                      <Link href="/cerebro" className="flex-1">
                        <AnimatedArrowButton variant="default" size="sm" className="w-full">
                          {path.progress > 0 ? 'Continue Learning' : 'Start Path'}
                        </AnimatedArrowButton>
                      </Link>
                      <AnimatedArrowButton variant="ghost" size="sm">
                        Preview
                      </AnimatedArrowButton>
                    </div>
                  </CardContent>
                </Card>
              </HolographicBorder>
            </RevealAnimation>
          ))}
        </div>

        {/* Bottom CTA */}
        <RevealAnimation direction="up" delay={0.8} className="mt-16 text-center">
          <HolographicBorder glowColor="#00ffff" animated={true}>
            <Card className="border-2 border-dashed border-muted-foreground/20 bg-gradient-to-r from-teal-500/5 via-purple-500/5 to-blue-500/5 p-8">
              <div className="mx-auto max-w-2xl">
                <GlitchText className="mb-4 text-2xl font-bold">
                  Can&apos;t Find Your Path?
                </GlitchText>
                <p className="mb-6 text-muted-foreground">
                  We offer custom AI training programs tailored to your organization&apos;s specific needs and goals.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link href="/cerebro">
                    <NeonGlow color="#00ffff" intensity={1}>
                      <AnimatedArrowButton variant="default">
                        Explore 3D Skill Trees
                      </AnimatedArrowButton>
                    </NeonGlow>
                  </Link>
                  <AnimatedArrowButton variant="outline">
                    Talk to Expert
                  </AnimatedArrowButton>
                </div>
              </div>
            </Card>
          </HolographicBorder>
        </RevealAnimation>
      </div>
    </section>
  );
}
