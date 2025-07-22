"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import dynamic from 'next/dynamic';

const SkillTree = dynamic(() => import('@/components/3d/skill-tree-fixed'), {
  ssr: false,
  loading: () => (
    <div className="flex h-96 items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent mx-auto" />
        <p className="text-muted-foreground">Loading 3D skill tree...</p>
      </div>
    </div>
  )
});

import { aiSkillTreeData, cybersecuritySkillTreeData, skillCategories } from '@/data/skill-tree-data';
import { SkillNode } from '@/types/skill-tree';
import { 
  Brain, 
  Shield, 
  Target, 
  TrendingUp, 
  Award,
  BookOpen,
  Zap,
  Globe,
  Code,
} from 'lucide-react';

const CerebroPage: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<'architect' | 'developer' | 'devsecops'>('architect');
  const [_selectedNode, setSelectedNode] = useState<SkillNode | null>(null);

  const skillTrees = {
    architect: aiSkillTreeData,
    developer: aiSkillTreeData,
    devsecops: cybersecuritySkillTreeData
  };

  const currentSkillTree = skillTrees[selectedPath];
  
  // Calculate overall progress
  const totalNodes = currentSkillTree.length;
  const completedNodes = currentSkillTree.filter(node => node.progress >= 100).length;
  const inProgressNodes = currentSkillTree.filter(node => node.progress > 0 && node.progress < 100).length;
  const overallProgress = Math.round((completedNodes / totalNodes) * 100);

  const handleNodeClick = (node: SkillNode) => {
    setSelectedNode(node);
  };

  const pathways = [
    {
      id: 'architect',
      title: 'AI Architect (Strategist Class)',
      description: 'Design and strategize advanced AI systems for transformative impact',
      icon: Brain,
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/30',
      nodes: skillTrees.architect.length,
      completed: skillTrees.architect.filter(n => n.progress >= 100).length,
      totalXP: skillTrees.architect.reduce((sum, node) => sum + (node.progress >= 100 ? node.xp : 0), 0)
    },
    {
      id: 'developer',
      title: 'AI Developer (Builder Class)',
      description: 'Create and implement AI solutions with hands-on development',
      icon: Code,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      nodes: skillTrees.developer.length,
      completed: skillTrees.developer.filter(n => n.progress >= 100).length,
      totalXP: skillTrees.developer.reduce((sum, node) => sum + (node.progress >= 100 ? node.xp : 0), 0)
    },
    {
      id: 'devsecops',
      title: 'AI DevSecOps (Guardian Class)',
      description: 'Secure and protect AI infrastructures with cutting-edge DevSecOps practices',
      icon: Shield,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      nodes: skillTrees.devsecops.length,
      completed: skillTrees.devsecops.filter(n => n.progress >= 100).length,
      totalXP: skillTrees.devsecops.reduce((sum, node) => sum + (node.progress >= 100 ? node.xp : 0), 0)
    }
  ];

  const achievements = [
    {
      icon: Target,
      title: 'First Steps',
      description: 'Complete your first skill node',
      progress: completedNodes > 0 ? 100 : 0,
      unlocked: completedNodes > 0
    },
    {
      icon: TrendingUp,
      title: 'Learning Streak',
      description: 'Complete 5 skill nodes',
      progress: Math.min((completedNodes / 5) * 100, 100),
      unlocked: completedNodes >= 5
    },
    {
      icon: Award,
      title: 'Expert Level',
      description: 'Complete an entire learning path',
      progress: overallProgress,
      unlocked: overallProgress >= 100
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container py-8">
        {/* Header */} 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center max-w-4xl mx-auto px-4"
        >
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-teal-500/30 to-purple-500/30 p-4 shadow-lg">
              <Brain className="h-12 w-12 text-teal-500 animate-pulse" />
            </div>
          </div>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-600">
            Europa.exe AI Learning Metaverse
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground leading-relaxed mb-6">
            Embark on a transformative AI learning journey with immersive 3D skill trees, gamified quests, and verifiable BNS credentials. Master AI architecture, development, and DevSecOps while connecting with a vibrant community of innovators.
          </p>
          <Button variant="outline" size="lg" className="hover:bg-teal-500 hover:text-white transition" onClick={() => alert('Join the waiting list feature coming soon!')}>
            Join the Waiting List
          </Button>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid gap-4 md:grid-cols-4"
        >
          <Card className="border-teal-500/30 bg-gradient-to-br from-teal-500/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-teal-500" />
                <div>
                  <div className="text-2xl font-bold">{totalNodes}</div>
                  <div className="text-sm text-muted-foreground">Total Skills</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">{completedNodes}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold">{inProgressNodes}</div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">{overallProgress}%</div>
                  <div className="text-sm text-muted-foreground">Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Pathways */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="mb-4 text-2xl font-bold">Choose Your Learning Path</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {pathways.map((pathway: typeof pathways[number]) => (
              <Card
                key={pathway.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPath === pathway.id
                    ? `border-2 ${pathway.borderColor} shadow-lg`
                    : 'border-muted hover:border-muted-foreground/50'
                }`}
                onClick={() => setSelectedPath(pathway.id as 'architect' | 'developer' | 'devsecops')}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`rounded-lg ${pathway.bgColor} p-2`}>
                      <pathway.icon className={`h-6 w-6 ${pathway.color}`} />
                    </div>
                    <div>
                      <CardTitle>{pathway.title}</CardTitle>
                      <CardDescription>{pathway.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className="font-medium">{pathway.nodes}</div>
                      <div className="text-muted-foreground">Skills</div>
                    </div>
                    <div>
                      <div className="font-medium">{pathway.completed}</div>
                      <div className="text-muted-foreground">Completed</div>
                    </div>
                    <div>
                      <div className="font-medium">{pathway.totalXP}</div>
                      <div className="text-muted-foreground">XP Earned</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="skill-tree" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="skill-tree">3D Skill Tree</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="skill-tree" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-2 border-teal-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-teal-500" />
                    <span>Interactive 3D Skill Tree</span>
                  </CardTitle>
                  <CardDescription>
                    Navigate through your learning journey. Click on nodes to explore skills and track your progress.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SkillTree
                    nodes={currentSkillTree}
                    onNodeClick={handleNodeClick}
                    className="h-96"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid gap-4 md:grid-cols-3"
            >
              {achievements.map((achievement, _index) => (
                <Card
                  key={achievement.title}
                  className={`transition-all duration-300 ${
                    achievement.unlocked
                      ? 'border-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent'
                      : 'border-muted bg-muted/20'
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`rounded-lg p-2 ${
                        achievement.unlocked ? 'bg-green-500/10' : 'bg-muted'
                      }`}>
                        <achievement.icon className={`h-6 w-6 ${
                          achievement.unlocked ? 'text-green-500' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round(achievement.progress)}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid gap-6 md:grid-cols-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>Your progress across different skill categories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(skillCategories).map(([key, category]) => {
                    const categoryNodes = currentSkillTree.filter(node => node.category === key);
                    const completedInCategory = categoryNodes.filter(node => node.progress >= 100).length;
                    const progressPercentage = categoryNodes.length > 0 
                      ? Math.round((completedInCategory / categoryNodes.length) * 100) 
                      : 0;

                    if (categoryNodes.length === 0) return null;

                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center space-x-2">
                            <div 
                              className="h-3 w-3 rounded-full" 
                              style={{ backgroundColor: category.color }}
                            />
                            <span>{category.name}</span>
                          </span>
                          <span>{completedInCategory}/{categoryNodes.length}</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Next Steps</CardTitle>
                  <CardDescription>Skills you should focus on next</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentSkillTree
                      .filter(node => !node.isLocked && node.progress < 100)
                      .slice(0, 3)
                      .map((node) => (
                        <div key={node.id} className="flex items-center space-x-3 rounded-lg border p-3">
                          <div className="rounded bg-teal-500/10 p-2">
                            <Code className="h-4 w-4 text-teal-500" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{node.title}</div>
                            <div className="text-sm text-muted-foreground">{node.duration} • {node.xp} XP</div>
                          </div>
                          <Badge variant="outline">{node.difficulty}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CerebroPage;
