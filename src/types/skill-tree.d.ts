 import { Vector3 } from 'three';

export interface SkillNode {
  id: string;
  title: string;
  description: string;
  level: number;
  progress: number;
  isActive: boolean;
  isLocked: boolean;
  prerequisites?: string[];
  skills: string[];
  position?: Vector3;
  category: string;
  xp: number;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completionCriteria?: {
    type: 'quiz' | 'project' | 'assessment';
    threshold: number;
    total: number;
  };
  resources?: {
    type: 'video' | 'document' | 'interactive';
    url: string;
    title: string;
  }[];
}

export interface SkillTreeProps {
  nodes: SkillNode[];
  width?: number;
  height?: number;
  levelHeight?: number;
  onNodeClick?: (node: SkillNode) => void;
  onNodeHover?: (node: SkillNode | null) => void;
  className?: string;
}

export interface SkillNodeMaterial {
  color: string;
  glowIntensity: number;
  isAnimating: boolean;
}

export interface SkillConnection {
  start: Vector3;
  end: Vector3;
  progress: number;
  isActive: boolean;
}

export interface SkillTreeState {
  cameraPosition: Vector3;
  targetPosition: Vector3;
  isAnimating: boolean;
  hoveredNode: SkillNode | null;
  selectedNode: SkillNode | null;
}

export interface NodeProgressData {
  completed: number;
  total: number;
  percentage: number;
  nextMilestone?: {
    title: string;
    remaining: number;
  };
}

export interface SkillCategory {
  id: string;
  name: string;
  color: string;
  description: string;
  totalNodes: number;
  completedNodes: number;
}

export interface SkillTreeAnalytics {
  totalProgress: number;
  completedNodes: number;
  totalNodes: number;
  activeNodes: number;
  categoryProgress: Record<string, NodeProgressData>;
  recentUnlocks: SkillNode[];
  suggestedNext: SkillNode[];
}
