"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Floating particles component
export const FloatingParticles: React.FC<{
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  className?: string;
}> = ({ 
  count = 50, 
  color = "#00ffff", 
  size = 2, 
  speed = 0.5,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles: HTMLDivElement[] = [];
    const container = containerRef.current;

    // Create particles
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full opacity-60 animate-pulse';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      particle.style.animationDuration = `${2 + Math.random() * 3}s`;
      
      container.appendChild(particle);
      particles.push(particle);

      // Animate particle movement
      const animateParticle = () => {
        const x = Math.sin(Date.now() * 0.001 * speed + i) * 20;
        const y = Math.cos(Date.now() * 0.001 * speed + i * 0.5) * 20;
        particle.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(animateParticle);
      };
      animateParticle();
    }

    return () => {
      particles.forEach(particle => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      });
    };
  }, [count, color, size, speed]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    />
  );
};

// Glitch text effect
export const GlitchText: React.FC<{
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}> = ({ children, className = "", intensity = 1 }) => {
  const [isGlitching, setIsGlitching] = React.useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`transition-all duration-200 ${
          isGlitching 
            ? `animate-pulse filter blur-[1px] translate-x-[${intensity}px]` 
            : ''
        }`}
        style={{
          textShadow: isGlitching 
            ? `${intensity}px 0 #ff0000, -${intensity}px 0 #00ffff` 
            : 'none'
        }}
      >
        {children}
      </div>
      
      {isGlitching && (
        <>
          <div 
            className="absolute inset-0 text-red-500 opacity-70"
            style={{ transform: `translateX(${intensity * 2}px)` }}
          >
            {children}
          </div>
          <div 
            className="absolute inset-0 text-cyan-500 opacity-70"
            style={{ transform: `translateX(-${intensity * 2}px)` }}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
};

// Holographic border effect
export const HolographicBorder: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  animated?: boolean;
}> = ({ 
  children, 
  className = "", 
  glowColor = "#00ffff",
  animated = true 
}) => {
  return (
    <div className={`relative ${className}`}>
      <div 
        className={`absolute inset-0 rounded-lg border-2 ${
          animated ? 'animate-pulse' : ''
        }`}
        style={{
          borderColor: glowColor,
          boxShadow: `0 0 20px ${glowColor}40, inset 0 0 20px ${glowColor}20`
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Matrix rain effect
export const MatrixRain: React.FC<{
  className?: string;
  density?: number;
  speed?: number;
}> = ({ className = "", density = 20, speed = 50 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff00';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, speed);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [density, speed]);

  return (
    <canvas 
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none opacity-20 ${className}`}
    />
  );
};

// Neon glow effect
export const NeonGlow: React.FC<{
  children: React.ReactNode;
  color?: string;
  intensity?: number;
  className?: string;
}> = ({ children, color = "#00ffff", intensity = 1, className = "" }) => {
  return (
    <div 
      className={`relative ${className}`}
      style={{
        filter: `drop-shadow(0 0 ${10 * intensity}px ${color}) drop-shadow(0 0 ${20 * intensity}px ${color}) drop-shadow(0 0 ${30 * intensity}px ${color})`
      }}
    >
      {children}
    </div>
  );
};

// Animated gradient background
export const AnimatedGradient: React.FC<{
  colors?: string[];
  className?: string;
  speed?: number;
}> = ({ 
  colors = ["#1a1a2e", "#16213e", "#0f3460"], 
  className = "",
  speed = 3
}) => {
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{
        background: `linear-gradient(-45deg, ${colors.join(', ')})`,
        backgroundSize: '400% 400%',
        animation: `gradientShift ${speed}s ease infinite`
      }}
    >
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

// Scan line effect
export const ScanLines: React.FC<{
  className?: string;
  opacity?: number;
  speed?: number;
}> = ({ className = "", opacity = 0.1, speed = 2 }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div 
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 255, ${opacity}) 2px,
            rgba(0, 255, 255, ${opacity}) 4px
          )`,
          animation: `scanMove ${speed}s linear infinite`
        }}
      />
      <style jsx>{`
        @keyframes scanMove {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
};

// Reveal animation wrapper
export const RevealAnimation: React.FC<{
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}> = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  className = ""
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Typewriter effect
export const TypewriterText: React.FC<{
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}> = ({ text, speed = 50, className = "", onComplete }) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};
