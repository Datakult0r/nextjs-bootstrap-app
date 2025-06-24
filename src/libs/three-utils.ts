import * as THREE from 'three';
 
// Calculate positions for nodes in a tree structure
export const calculateNodePositions = (
  nodes: any[],
  width: number = 10,
  height: number = 10,
  levelHeight: number = 2
): Map<string, THREE.Vector3> => {
  const positions = new Map<string, THREE.Vector3>();
  const levels: { [key: number]: any[] } = {};

  // First pass: organize nodes by level
  nodes.forEach(node => {
    if (!levels[node.level]) {
      levels[node.level] = [];
    }
    levels[node.level].push(node);
  });

  // Second pass: calculate positions
  Object.entries(levels).forEach(([level, levelNodes]) => {
    const levelNum = parseInt(level);
    const nodeCount = levelNodes.length;
    const levelWidth = width * (nodeCount - 1);
    
    levelNodes.forEach((node, index) => {
      const x = (index * width) - (levelWidth / 2);
      const y = -levelNum * levelHeight;
      const z = 0;
      
      positions.set(node.id, new THREE.Vector3(x, y, z));
    });
  });

  return positions;
};

// Create a curved line between two points
export const createCurvedLine = (
  start: THREE.Vector3,
  end: THREE.Vector3,
  midPointOffset: number = 2
): THREE.CatmullRomCurve3 => {
  const midPoint = new THREE.Vector3(
    (start.x + end.x) / 2,
    (start.y + end.y) / 2 + midPointOffset,
    (start.z + end.z) / 2
  );

  return new THREE.CatmullRomCurve3([
    start,
    midPoint,
    end
  ]);
};

// Generate colors based on progress/status
export const getNodeColor = (
  progress: number,
  isActive: boolean = false,
  isLocked: boolean = false
): string => {
  if (isLocked) {
    return '#4A5568'; // Gray for locked nodes
  }
  
  if (isActive) {
    return '#3B82F6'; // Blue for active nodes
  }
  
  if (progress >= 100) {
    return '#10B981'; // Green for completed nodes
  }
  
  if (progress > 0) {
    return '#F59E0B'; // Yellow for in-progress nodes
  }
  
  return '#6B7280'; // Default gray
};

// Create glowing material
export const createGlowMaterial = (color: string): THREE.ShaderMaterial => {
  return new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(color) },
      glowIntensity: { value: 1.0 },
      time: { value: 0 }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float glowIntensity;
      uniform float time;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        float rim = 1.0 - max(dot(normalize(-vPosition), vNormal), 0.0);
        rim = pow(rim, 2.0);
        
        // Add pulsing effect
        float pulse = (sin(time * 2.0) + 1.0) * 0.5;
        rim *= (0.8 + pulse * 0.4);
        
        vec3 glowColor = color * rim * glowIntensity;
        gl_FragColor = vec4(glowColor, rim);
      }
    `,
    transparent: true,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending
  });
};

// Animation helpers
export const easeInOutCubic = (t: number): number => {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Camera position helper
export const calculateCameraPosition = (
  nodes: any[],
  width: number,
  height: number
): THREE.Vector3 => {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  nodes.forEach(node => {
    minX = Math.min(minX, node.position.x);
    maxX = Math.max(maxX, node.position.x);
    minY = Math.min(minY, node.position.y);
    maxY = Math.max(maxY, node.position.y);
  });

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const distance = Math.max(maxX - minX, maxY - minY) * 1.5;

  return new THREE.Vector3(centerX, centerY, distance);
};

// Helper to create connection lines between nodes
export const createConnectionLines = (
  nodes: any[],
  positions: Map<string, THREE.Vector3>
): THREE.BufferGeometry[] => {
  const lines: THREE.BufferGeometry[] = [];

  nodes.forEach(node => {
    if (node.prerequisites) {
      node.prerequisites.forEach((prereqId: string) => {
        const start = positions.get(prereqId);
        const end = positions.get(node.id);

        if (start && end) {
          const curve = createCurvedLine(start, end);
          const points = curve.getPoints(50);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          lines.push(geometry);
        }
      });
    }
  });

  return lines;
};
