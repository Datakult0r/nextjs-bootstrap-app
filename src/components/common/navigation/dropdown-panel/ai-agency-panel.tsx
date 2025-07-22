'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Leaf, 
  Stethoscope, 
  PenTool, 
  Hotel, 
  Wrench, 
  UserCheck,
  Building,
  Workflow,
  Code,
  TrendingUp,
  BarChart,
  Zap,
  MessageSquare,
  Mic,
  Globe,
  Scale,
  Calculator,
  Brain,
  MessageCircle,
  Bell,
  CheckCircle,
  Truck,
  Package,
  DollarSign
} from "lucide-react";
import { industries, aiAgencyProducts } from "@/constants/nav-links";

const iconMap = {
  leaf: Leaf,
  stethoscope: Stethoscope,
  scale: Scale,
  calculator: Calculator,
  "pen-tool": PenTool,
  brain: Brain,
  "message-circle": MessageCircle,
  hotel: Hotel,
  "trending-up": TrendingUp,
  bell: Bell,
  wrench: Wrench,
  "check-circle": CheckCircle,
  truck: Truck,
  "user-check": UserCheck,
  package: Package,
  "dollar-sign": DollarSign,
  building: Building,
  workflow: Workflow,
  code: Code,
  "bar-chart": BarChart,
  zap: Zap,
  "message-square": MessageSquare,
  mic: Mic,
  globe: Globe
};

export function AIAgencyPanel() {
  return (
    <div className="w-[800px] p-6">
      <div className="grid grid-cols-2 gap-8">
        {/* Industries Panel */}
        <div>
          <div className="mb-4 flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
            <h3 className="text-lg font-semibold text-foreground">Industries</h3>
          </div>
          <div className="space-y-3">
            {industries.map((industry, industryIndex) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: industryIndex * 0.05 }}
              >
                <Card className="group border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-background/80 hover:shadow-md">
                  <CardContent className="p-3">
                    <h4 className="mb-2 font-medium text-foreground group-hover:text-primary transition-colors">
                      {industry.name}
                    </h4>
                    <div className="space-y-1">
                      {industry.list.slice(0, 2).map((item) => {
                        const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-2 rounded-md p-1 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            {IconComponent && <IconComponent className="h-3 w-3" />}
                            <span className="truncate">{item.name}</span>
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {item.badge}
                            </Badge>
                          </Link>
                        );
                      })}
                      {industry.list.length > 2 && (
                        <Link
                          href={`/ai-agency/industries/${industry.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-xs text-primary hover:underline"
                        >
                          +{industry.list.length - 2} more solutions
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Products Panel */}
        <div>
          <div className="mb-4 flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500" />
            <h3 className="text-lg font-semibold text-foreground">Products</h3>
          </div>
          <div className="space-y-3">
            {aiAgencyProducts.map((productCategory, categoryIndex) => (
              <motion.div
                key={productCategory.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.05 + 0.1 }}
              >
                <Card className="group border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-background/80 hover:shadow-md">
                  <CardContent className="p-3">
                    <h4 className="mb-2 font-medium text-foreground group-hover:text-primary transition-colors">
                      {productCategory.name}
                    </h4>
                    <div className="space-y-1">
                      {productCategory.list.map((product) => {
                        const IconComponent = iconMap[product.icon as keyof typeof iconMap];
                        return (
                          <Link
                            key={product.name}
                            href={product.href}
                            className="flex items-center space-x-2 rounded-md p-1 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            {IconComponent && <IconComponent className="h-3 w-3" />}
                            <span className="truncate">{product.name}</span>
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {product.badge}
                            </Badge>
                          </Link>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 text-center"
      >
        <p className="mb-2 text-sm text-muted-foreground">
          Need a custom AI solution for your industry?
        </p>
        <Link
          href="/ai-agency/consultation"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Schedule Free Consultation
        </Link>
      </motion.div>
    </div>
  );
} 