"use client";

import dynamic from 'next/dynamic';
import { SkillTreeProps } from '@/types/skill-tree';

// Create a simple fallback component for when 3D isn't available
const SkillTreeFallback = ({ nodes, onNodeClick }: SkillTreeProps) => {
  return (
    <div className="h-96 w-full rounded-lg border bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6">
      <div className="text-center text-white mb-6">
        <h3 className="text-xl font-bold mb-2">Skill Tree</h3>
        <p className="text-muted-foreground">Interactive 3D view loading...</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto">
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
              node.isLocked 
                ? 'border-gray-600 bg-gray-800/50' 
                : node.progress >= 100
                ? 'border-green-500/30 bg-green-500/10'
                : node.progress > 0
                ? 'border-yellow-500/30 bg-yellow-500/10'
                : 'border-blue-500/30 bg-blue-500/10'
            }`}
            onClick={() => !node.isLocked && onNodeClick?.(node)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm text-white">{node.title}</h4>
              <span className="text-xs text-muted-foreground">{node.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all ${
                  node.progress >= 100 ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${node.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Import the 3D component dynamically with proper error handling
const Dynamic3DSkillTree = dynamic(
  () => import('./skill-tree-core').catch(() => ({ default: SkillTreeFallback })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading 3D skill tree...</p>
        </div>
      </div>
    )
  }
);

// Main component that handles the dynamic import with fallback
const SkillTree: React.FC<SkillTreeProps> = (props) => {
  // Check if we're in a browser environment that supports WebGL
  if (typeof window !== 'undefined') {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        // WebGL not supported, use fallback
        return <SkillTreeFallback {...props} />;
      }
    } catch (error) {
      // Error checking WebGL, use fallback
      return <SkillTreeFallback {...props} />;
    }
  }

  return <Dynamic3DSkillTree {...props} />;
};

export default SkillTree;
