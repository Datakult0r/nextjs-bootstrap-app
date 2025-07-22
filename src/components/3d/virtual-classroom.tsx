"use client";

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  Volume2, 
  Users, 
  MessageCircle, 
  Share,
  Maximize,
  Settings
} from 'lucide-react';

interface Lesson {
  title: string;
  description: string;
  duration: string;
  instructor: string;
}

// Floating holographic screen component
const HolographicScreen: React.FC<{
  position: [number, number, number];
  content: string;
  isActive: boolean;
}> = ({ position, content, isActive }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Rotation animation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Glow effect
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      if (material) {
        material.emissiveIntensity = isActive ? 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1 : 0.1;
      }
    }
  });

  return (
    <group position={position}>
      {/* Screen frame */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      >
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial
          color={isActive ? "#00ffff" : "#4a5568"}
          emissive={isActive ? "#003333" : "#111111"}
          emissiveIntensity={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Screen content */}
      <Html
        center
        distanceFactor={10}
        position={[0, 0, 0.01]}
        transform
        occlude
      >
        <div className="w-64 h-40 bg-black/80 rounded-lg border border-cyan-500/50 p-4 backdrop-blur-sm">
          <div className="text-cyan-400 text-sm font-mono">
            {content}
          </div>
        </div>
      </Html>

      {/* Holographic border effect */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[3.2, 2.2]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Particle system for ambient effects
const ParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1000;

  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

    colors[i * 3] = Math.random() * 0.5 + 0.5; // R
    colors[i * 3 + 1] = Math.random() * 0.5 + 0.5; // G
    colors[i * 3 + 2] = 1; // B (blue tint)
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// AI Avatar component
const AIAvatar: React.FC<{
  position: [number, number, number];
  isActive: boolean;
}> = ({ position, isActive }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [speaking, setSpeaking] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
      
      // Pulsing when active
      if (isActive) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
        meshRef.current.scale.setScalar(scale);
      }
    }
  });

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setSpeaking(prev => !prev);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  return (
    <group position={position}>
      {/* Avatar body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={isActive ? "#00ff88" : "#4a5568"}
          emissive={isActive ? "#002211" : "#000000"}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Holographic ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
        <ringGeometry args={[0.8, 1, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={isActive ? 0.6 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Speech indicator */}
      {speaking && (
        <Html center position={[0, 1, 0]}>
          <div className="bg-black/80 text-cyan-400 px-2 py-1 rounded text-xs border border-cyan-500/50">
            Speaking...
          </div>
        </Html>
      )}
    </group>
  );
};

// Main 3D scene
const VirtualClassroomScene: React.FC<{
  lesson?: Lesson;
  isPlaying: boolean;
}> = ({ lesson: _lesson, isPlaying }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      {/* Environment */}
      <Environment preset="night" />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ff00ff" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#ffffff"
        target-position={[0, 0, 0]}
      />

      {/* Particle field */}
      <ParticleField />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#1a1a2e"
          transparent
          opacity={0.8}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Holographic screens */}
      <HolographicScreen
        position={[-4, 2, 0]}
        content="AI Concepts & Theory"
        isActive={isPlaying}
      />
      <HolographicScreen
        position={[4, 2, 0]}
        content="Code Examples"
        isActive={isPlaying}
      />
      <HolographicScreen
        position={[0, 3, -3]}
        content="Interactive Exercises"
        isActive={isPlaying}
      />

      {/* AI Avatar */}
      <AIAvatar position={[0, 0, 2]} isActive={isPlaying} />

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={20}
        minDistance={3}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
};

// Control panel component
const ClassroomControls: React.FC<{
  isPlaying: boolean;
  onPlayPause: () => void;
  progress: number;
  participants: number;
}> = ({ isPlaying, onPlayPause, progress, participants }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-4 left-4 right-4"
    >
      <Card className="border-cyan-500/30 bg-black/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onPlayPause}
                className="text-cyan-400 hover:text-cyan-300"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-cyan-400" />
                <div className="w-20 h-1 bg-gray-600 rounded">
                  <div className="w-3/4 h-full bg-cyan-400 rounded" />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-cyan-400">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{participants}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>Chat</span>
              </div>
              
              <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                <Share className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                <Maximize className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-xs text-cyan-400">
              <span>Lesson Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Loading component
const ClassroomLoading: React.FC = () => (
  <div className="flex h-96 items-center justify-center">
    <div className="text-center">
      <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent mx-auto" />
      <p className="text-cyan-400">Initializing virtual classroom...</p>
    </div>
  </div>
);

// Main virtual classroom component
export const VirtualClassroom: React.FC<{
  lesson?: Lesson;
  className?: string;
}> = ({ lesson, className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [participants] = useState(Math.floor(Math.random() * 50) + 10);

  const defaultLesson: Lesson = {
    title: "Introduction to AI",
    description: "Learn the basics of artificial intelligence",
    duration: "45 minutes",
    instructor: "AI Assistant"
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 1, 100));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="h-96 w-full rounded-lg border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden">
        <Suspense fallback={<ClassroomLoading />}>
          <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
            <VirtualClassroomScene lesson={lesson || defaultLesson} isPlaying={isPlaying} />
          </Canvas>
        </Suspense>
        
        <ClassroomControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          progress={progress}
          participants={participants}
        />
      </div>
    </div>
  );
};

export default VirtualClassroom;
