'use client'

import { motion } from 'framer-motion'
import { Brain, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface FloatingBrainProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showVerification?: boolean
}

export function FloatingBrain({ 
  className = '', 
  size = 'md',
  showVerification = true 
}: FloatingBrainProps) {
  const [isVerified, setIsVerified] = useState(false)
  const [pulseCount, setPulseCount] = useState(0)

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32'
  }

  const iconSizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  useEffect(() => {
    if (showVerification) {
      const timer = setTimeout(() => {
        setIsVerified(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showVerification])

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(prev => prev + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Main Brain Container */}
      <motion.div
        className={`relative ${sizeClasses[size]} mx-auto`}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Glowing Background */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/30 to-purple-500/30 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Brain Icon */}
        <motion.div
          className="relative z-10 flex items-center justify-center w-full h-full rounded-full bg-gradient-to-r from-teal-500 to-purple-500 shadow-2xl"
          whileHover={{ scale: 1.1 }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(20, 184, 166, 0.5)",
              "0 0 40px rgba(147, 51, 234, 0.5)",
              "0 0 20px rgba(20, 184, 166, 0.5)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          <Brain className={`${iconSizes[size]} text-white`} />
        </motion.div>

        {/* Neural Network Lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1
          }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-teal-400 to-transparent"
              style={{
                left: `${20 + i * 10}%`,
                top: '10%',
                height: '80%',
                transform: `rotate(${i * 30}deg)`
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleY: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Pulse Rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`pulse-${i}-${pulseCount}`}
            className="absolute inset-0 rounded-full border-2 border-teal-400/30"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ 
              scale: [1, 2.5, 3],
              opacity: [0.8, 0.2, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>

      {/* Blockchain Verification Badge */}
      {showVerification && (
        <motion.div
          className="absolute -bottom-2 -right-2 z-20"
          initial={{ scale: 0, opacity: 0 }}
          animate={isVerified ? { 
            scale: [0, 1.2, 1], 
            opacity: 1 
          } : {}}
          transition={{ 
            duration: 0.5,
            ease: "backOut"
          }}
        >
          <div className="relative">
            <motion.div
              className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(34, 197, 94, 0.5)",
                  "0 0 20px rgba(34, 197, 94, 0.8)",
                  "0 0 10px rgba(34, 197, 94, 0.5)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              <CheckCircle className="h-4 w-4 text-white" />
            </motion.div>
            
            {/* Verification Particles */}
            {isVerified && [...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full"
                style={{
                  top: '50%',
                  left: '50%'
                }}
                animate={{
                  x: [0, (i % 2 ? 20 : -20)],
                  y: [0, (i < 2 ? -20 : 20)],
                  opacity: [1, 0],
                  scale: [1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  repeatDelay: 2
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-teal-400 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* BNS Label */}
      {showVerification && isVerified && (
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="px-2 py-1 bg-black/80 rounded-md text-xs text-green-400 font-mono whitespace-nowrap">
            BNS Verified ✓
          </div>
        </motion.div>
      )}
    </div>
  )
} 