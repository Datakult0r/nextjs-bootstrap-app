"use client";

import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Line, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { SkillNode, SkillTreeProps } from '@/types/skill-tree';

// Import utilities from client-side only file
import { 
  calculateNodePositions, 
  createConnectionLines, 
  getNodeColor, 
  createGlowMaterial
} from '@/libs/three-utils.client';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Lock, CheckCircle, Clock, Star } from 'lucide-react';

// Individual skill node component
const SkillNodeMesh: React.FC<{
  node: SkillNode;
  position: THREE.Vector3;
  onNodeClick?: (node: SkillNode) => void;
  onNodeHover?: (node: SkillNode | null) => void;
  isHovered: boolean;
}> = ({ node, position, onNodeClick, onNodeHover, isHovered }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const nodeColor = getNodeColor(node.progress, node.isActive, node.isLocked);
  const glowMaterial = useMemo(() => createGlowMaterial(nodeColor), [nodeColor]);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime + position.x) * 0.1;
      
      // Scale animation on hover
      const targetScale = hovered || isHovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    if (glowRef.current && glowMaterial.uniforms) {
      glowMaterial.uniforms.time.value = state.clock.elapsedTime;
      glowRef.current.visible = hovered || isHovered || node.isActive;
    }
  });

  const handleClick = () => {
    if (!node.isLocked && onNodeClick) {
      onNodeClick(node);
    }
  };

  const handlePointerOver = () => {
    setHovered(true);
    if (onNodeHover) {
      onNodeHover(node);
    }
  };

  const handlePointerOut = () => {
    setHovered(false);
    if (onNodeHover) {
      onNodeHover(null);
    }
  };

  return (
    <group position={[position.x, position.y, position.z]}>
      {/* Main node sphere */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={nodeColor}
          metalness={0.8}
          roughness={0.2}
          emissive={nodeColor}
          emissiveIntensity={node.isActive ? 0.3 : 0.1}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef} scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <primitive object={glowMaterial} />
      </mesh>

      {/* Progress ring */}
      {node.progress > 0 && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6, 0.7, 32, 1, 0, (node.progress / 100) * Math.PI * 2]} />
          <meshBasicMaterial color="#10B981" transparent opacity={0.8} />
        </mesh>
      )}

      {/* Lock icon for locked nodes */}
      {node.isLocked && (
        <Html center>
          <div className="pointer-events-none">
            <Lock className="h-4 w-4 text-gray-400" />
          </div>
        </Html>
      )}

      {/* Completion checkmark */}
      {node.progress >= 100 && (
        <Html center>
          <div className="pointer-events-none">
            <CheckCircle className="h-4 w-4 text-green-400" />
          </div>
        </Html>
      )}

      {/* Node label */}
      <Text
        position={[0, -1, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
      >
        {node.title}
      </Text>
    </group>
  );
};

// Connection lines between nodes
const ConnectionLines: React.FC<{
  nodes: SkillNode[];
  positions: Map<string, THREE.Vector3>;
}> = ({ nodes, positions }) => {
  const lines = useMemo(() => createConnectionLines(nodes, positions), [nodes, positions]);

  return (
    <>
      {lines.map((geometry, index) => {
        // Convert TypedArray to Vector3 array for the Line component
        const points = Array.from(geometry.attributes.position.array);
        const vertices = [];
        for (let i = 0; i < points.length; i += 3) {
          vertices.push(new THREE.Vector3(points[i], points[i + 1], points[i + 2]));
        }
        
        return (
          <Line
            key={index}
            points={vertices}
            color="#4A5568"
            lineWidth={2}
            transparent
            opacity={0.6}
          />
        );
      }).filter(Boolean)}
    </>
  );
};

// Node details panel
const NodeDetailsPanel: React.FC<{
  node: SkillNode | null;
  onClose: () => void;
}> = ({ node, onClose }) => {
  if (!node) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-4 top-20 z-50 w-80"
    >
      <Card className="border-2 border-teal-500/30 bg-background/95 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-teal-500" />
              <CardTitle className="text-lg">{node.title}</CardTitle>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
          <CardDescription>{node.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{node.progress}%</span>
            </div>
            <Progress value={node.progress} className="h-2" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{node.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span>{node.xp} XP</span>
            </div>
          </div>

          {/* Difficulty */}
          <Badge 
            variant="outline" 
            className={
              node.difficulty === 'Beginner' ? 'border-green-500/30 text-green-400' :
              node.difficulty === 'Intermediate' ? 'border-yellow-500/30 text-yellow-400' :
              'border-red-500/30 text-red-400'
            }
          >
            {node.difficulty}
          </Badge>

          {/* Skills */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Skills You&apos;ll Learn:</h4>
            <div className="flex flex-wrap gap-1">
              {node.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          {node.prerequisites && node.prerequisites.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Prerequisites:</h4>
              <div className="text-xs text-muted-foreground">
                Complete {node.prerequisites.length} prerequisite node(s)
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Main 3D scene component
const SkillTreeScene: React.FC<{
  nodes: SkillNode[];
  onNodeClick?: (node: SkillNode) => void;
  onNodeHover?: (node: SkillNode | null) => void;
  hoveredNode: SkillNode | null;
}> = ({ nodes, onNodeClick, onNodeHover, hoveredNode }) => {
  const { camera } = useThree();
  
  const positions = useMemo(() => 
    calculateNodePositions(nodes, 3, 3, 2), 
    [nodes]
  );

  // Set initial camera position
  useEffect(() => {
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3B82F6" />

      {/* Connection lines */}
      <ConnectionLines nodes={nodes} positions={positions} />

      {/* Skill nodes */}
      {nodes.map((node) => {
        const position = positions.get(node.id);
        if (!position) return null;

        return (
          <SkillNodeMesh
            key={node.id}
            node={node}
            position={position}
            onNodeClick={onNodeClick}
            onNodeHover={onNodeHover}
            isHovered={hoveredNode?.id === node.id}
          />
        );
      })}

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={30}
        minDistance={5}
      />
    </>
  );
};

// Main skill tree component
const SkillTreeCore: React.FC<SkillTreeProps> = ({
  nodes,
  width: _width = 10,
  height: _height = 10,
  levelHeight: _levelHeight = 2,
  onNodeClick,
  onNodeHover,
  className = ""
}) => {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);

  const handleNodeClick = (node: SkillNode) => {
    setSelectedNode(node);
    if (onNodeClick) {
      onNodeClick(node);
    }
  };

  const handleNodeHover = (node: SkillNode | null) => {
    setHoveredNode(node);
    if (onNodeHover) {
      onNodeHover(node);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="h-96 w-full rounded-lg border bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <Suspense fallback={<div>Loading...</div>}>
          <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
            <SkillTreeScene
              nodes={nodes}
              onNodeClick={handleNodeClick}
              onNodeHover={handleNodeHover}
              hoveredNode={hoveredNode}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Node details panel */}
      <NodeDetailsPanel
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
};

export default SkillTreeCore;
