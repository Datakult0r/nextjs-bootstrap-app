'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Newspaper, 
  Settings, 
  Radio, 
  Zap, 
  Brain, 
  Rss,
  Monitor,
  Mic,
  AlertTriangle
} from 'lucide-react'
import { hackwireMenu } from '@/constants/nav-links'

const iconMap = {
  newspaper: Newspaper,
  settings: Settings,
  radio: Radio,
  zap: Zap,
  brain: Brain,
  rss: Rss,
  monitor: Monitor,
  mic: Mic,
  'alert-triangle': AlertTriangle
}

const colorMap = {
  cyan: 'from-cyan-500 to-blue-500',
  purple: 'from-purple-500 to-pink-500',
  red: 'from-red-500 to-orange-500'
}

const badgeColorMap = {
  Live: 'bg-green-500/20 text-green-400 border-green-500/30',
  Pro: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Streaming: 'bg-red-500/20 text-red-400 border-red-500/30'
}

export function HackwirePanel() {
  return (
    <div className="w-[800px] p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Hackwire News Platform
        </h3>
        <p className="text-sm text-muted-foreground">
          AI-powered news aggregation, stream management, and live broadcasting tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hackwireMenu.map((item, index) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Newspaper
          const gradientClass = colorMap[item.color as keyof typeof colorMap] || colorMap.cyan
          const badgeClass = badgeColorMap[item.badge as keyof typeof badgeColorMap] || badgeColorMap.Live

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.href}>
                <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${gradientClass} bg-opacity-10`}>
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <Badge className={`text-xs ${badgeClass}`}>
                        {item.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      {item.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {item.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-foreground">
                              {feature.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">
              Real-time news feed active
            </span>
          </div>
          <Link 
            href="/hackwire/newswire" 
            className="text-xs text-primary hover:text-primary/80 transition-colors"
          >
            View all news →
          </Link>
        </div>
      </div>
    </div>
  )
}