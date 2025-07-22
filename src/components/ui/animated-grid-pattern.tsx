"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/libs/utils";

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: string;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
  waveEffect?: boolean;
  neuralNetwork?: boolean;
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  waveEffect = true,
  neuralNetwork = false,
  ...props
}: AnimatedGridPatternProps) {
  const id = useRef(`grid-pattern-${Math.random().toString(36).substr(2, 9)}`);

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        waveEffect && "animate-grid-wave",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id.current}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
            className={cn(
              "stroke-current",
              neuralNetwork && "stroke-primary/40"
            )}
          />
          {neuralNetwork && (
            <>
              {/* Neural connection nodes */}
              <circle
                cx={width / 4}
                cy={height / 4}
                r="1"
                className="fill-primary/60 animate-neural-pulse"
              />
              <circle
                cx={(3 * width) / 4}
                cy={(3 * height) / 4}
                r="1"
                className="fill-accent/60 animate-neural-pulse"
                style={{ animationDelay: "1s" }}
              />
              {/* Connection lines */}
              <path
                d={`M${width / 4} ${height / 4} L${(3 * width) / 4} ${(3 * height) / 4}`}
                className="stroke-primary/20 animate-circuit-flow"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
            </>
          )}
        </pattern>
        
        {/* Gradient overlay for wave effect */}
        <linearGradient id={`${id.current}-gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      
      <rect width="100%" height="100%" fill={`url(#${id.current})`} />
      
      {/* Animated squares for dynamic effect */}
      {Array.from({ length: numSquares }, (_, i) => (
        <rect
          key={i}
          width={width}
          height={height}
          x={Math.random() * 100 + "%"}
          y={Math.random() * 100 + "%"}
          fill={`url(#${id.current}-gradient)`}
          className={cn(
            "animate-hologram",
            waveEffect && "animate-floating-orb"
          )}
          style={{
            animationDelay: `${Math.random() * duration}s`,
            animationDuration: `${duration + Math.random() * 2}s`,
          }}
        />
      ))}
      
      {/* Wave overlay effect */}
      {waveEffect && (
        <g className="animate-grid-wave">
          <path
            d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z"
            fill={`url(#${id.current}-gradient)`}
            opacity="0.1"
            className="animate-data-flow"
          />
          <path
            d="M0,60 Q30,40 60,60 T120,60 V100 H0 Z"
            fill="hsl(var(--accent) / 0.05)"
            className="animate-data-flow"
            style={{ animationDelay: "2s" }}
          />
        </g>
      )}
      
      {/* Neural network connections overlay */}
      {neuralNetwork && (
        <g className="opacity-30">
          {Array.from({ length: 10 }, (_, i) => (
            <g key={i}>
              <circle
                cx={`${Math.random() * 100}%`}
                cy={`${Math.random() * 100}%`}
                r="2"
                className="fill-primary animate-neural-pulse"
                style={{
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
              <path
                d={`M${Math.random() * 100}% ${Math.random() * 100}% L${Math.random() * 100}% ${Math.random() * 100}%`}
                className="stroke-primary/20 animate-circuit-flow"
                strokeWidth="1"
                strokeDasharray="3 3"
                style={{
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}