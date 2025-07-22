'use client'

import { motion } from 'framer-motion'
import { User, Shield, Star, Zap, Crown, Gem } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Web3AvatarProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  level?: number
  experience?: number
  maxExperience?: number
  badges?: string[]
  isOnline?: boolean
  showStats?: boolean
  avatarType?: 'default' | 'architect' | 'engineer' | 'guardian'
}

const avatarThemes = {
  default: {
    gradient: 'from-blue-500 to-purple-500',
    accent: 'text-blue-400',
    glow: 'rgba(59, 130, 246, 0.5)'
  },
  architect: {
    gradient: 'from-teal-500 to-cyan-500',
    accent: 'text-teal-400',
    glow: 'rgba(20, 184, 166, 0.5)'
  },
  engineer: {
    gradient: 'from-blue-500 to-indigo-500',
    accent: 'text-blue-400',
    glow: 'rgba(59, 130, 246, 0.5)'
  },
  guardian: {
    gradient: 'from-purple-500 to-pink-500',
    accent: 'text-purple-400',
    glow: 'rgba(147, 51, 234, 0.5)'
  }
}

const badgeIcons = {
  shield: Shield,
  star: Star,
  zap: Zap,
  crown: Crown,
  gem: Gem
}

export function Web3Avatar({
  className = '',
  size = 'md',
  level = 1,
  experience = 0,
  maxExperience = 100,
  badges = [],
  isOnline = false,
  showStats = true,
  avatarType = 'default'
}: Web3AvatarProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [pulseCount, setPulseCount] = useState(0)

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  }

  const iconSizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }

  const theme = avatarThemes[avatarType]
  const experiencePercentage = (experience / maxExperience) * 100

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(prev => prev + 1)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Avatar Container */}
      <motion.div
        className={`relative ${sizeClasses[size]} mx-auto`}
        whileHover={{ scale: 1.05 }}
        animate={{
          y: [0, -2, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Glowing Ring */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${theme.gradient} opacity-20 blur-md`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Level Ring */}
        <div className="absolute inset-0 rounded-full">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-700 opacity-30"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
              animate={{ 
                strokeDashoffset: 2 * Math.PI * 45 * (1 - experiencePercentage / 100)
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Avatar Background */}
        <motion.div
          className={`relative z-10 flex items-center justify-center w-full h-full rounded-full bg-gradient-to-r ${theme.gradient} shadow-2xl border-2 border-white/20`}
          animate={{
            boxShadow: [
              `0 0 20px ${theme.glow}`,
              `0 0 40px ${theme.glow}`,
              `0 0 20px ${theme.glow}`
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          <User className={`${iconSizes[size]} text-white`} />
        </motion.div>

        {/* Online Status */}
        {isOnline && (
          <motion.div
            className="absolute bottom-0 right-0 z-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <div className="relative">
              <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg" />
              <motion.div
                className="absolute inset-0 bg-green-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Level Badge */}
        <motion.div
          className="absolute -top-2 -right-2 z-20"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.gradient} flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white/20`}>
            {level}
          </div>
        </motion.div>

        {/* Pulse Rings */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`pulse-${i}-${pulseCount}`}
            className={`absolute inset-0 rounded-full border-2 border-gradient-to-r ${theme.gradient} opacity-30`}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ 
              scale: [1, 1.8, 2.2],
              opacity: [0.6, 0.2, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.8,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>

      {/* Stats Panel */}
      {showStats && isHovered && (
        <motion.div
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-30"
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-black/90 backdrop-blur-sm rounded-lg p-4 min-w-48 border border-white/10">
            {/* Level & Experience */}
            <div className="text-center mb-3">
              <div className={`text-lg font-bold ${theme.accent}`}>Level {level}</div>
              <div className="text-xs text-gray-400 mb-2">
                {experience}/{maxExperience} XP
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full bg-gradient-to-r ${theme.gradient}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${experiencePercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Badges */}
            {badges.length > 0 && (
              <div>
                <div className="text-xs text-gray-400 mb-2">Achievements</div>
                <div className="flex flex-wrap gap-1">
                  {badges.map((badge, index) => {
                    const IconComponent = badgeIcons[badge as keyof typeof badgeIcons] || Star
                    return (
                      <motion.div
                        key={badge}
                        className={`w-6 h-6 rounded bg-gradient-to-r ${theme.gradient} flex items-center justify-center`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1, type: "spring" }}
                      >
                        <IconComponent className="h-3 w-3 text-white" />
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Avatar Type */}
            <div className="text-center mt-3 pt-3 border-t border-white/10">
              <div className={`text-xs font-medium ${theme.accent} capitalize`}>
                {avatarType} Path
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Particles */}
      {isHovered && [...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className={`absolute w-1 h-1 ${theme.accent.replace('text-', 'bg-')} rounded-full opacity-60`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 10 - 5, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: Math.random(),
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
} 