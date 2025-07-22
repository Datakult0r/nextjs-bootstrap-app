import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FloatingBrain } from '@/components/animations/floating-brain'
import { 
  Code, 
  Zap, 
  BarChart3, 
  MessageSquare, 
  Workflow,
  Building,
  Mic,
  Globe,
  TrendingUp,
  Package,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Products | CoAI - Cutting-Edge AI Solutions',
  description: 'Explore our comprehensive suite of AI products designed to transform your business operations and drive innovation.',
}

const productCategories = [
  {
    name: "Core AI Solutions",
    description: "Foundational AI tools for business transformation",
    products: [
      {
        name: "Enterprise AI Suite",
        description: "Complete AI transformation toolkit for large organizations with advanced analytics and automation capabilities.",
        icon: Building,
        features: ["Multi-tenant Architecture", "Advanced Analytics", "Custom Integrations", "24/7 Support"],
        pricing: "Enterprise",
        badge: "Most Popular",
        color: "from-blue-500 to-cyan-500"
      },
      {
        name: "AI Workflow Automation",
        description: "Streamline business processes with intelligent automation and decision-making capabilities.",
        icon: Workflow,
        features: ["Process Mining", "Smart Routing", "Predictive Scheduling", "Real-time Monitoring"],
        pricing: "From $299/month",
        badge: "Automation",
        color: "from-purple-500 to-pink-500"
      },
      {
        name: "Custom AI Development",
        description: "Bespoke AI solutions tailored to your specific business needs and requirements.",
        icon: Code,
        features: ["Custom Models", "API Integration", "Scalable Architecture", "Ongoing Support"],
        pricing: "Custom Quote",
        badge: "Tailored",
        color: "from-green-500 to-emerald-500"
      }
    ]
  },
  {
    name: "AI Analytics & Intelligence",
    description: "Advanced data analysis and business intelligence tools",
    products: [
      {
        name: "Predictive Analytics Platform",
        description: "Advanced forecasting and trend analysis capabilities powered by machine learning algorithms.",
        icon: TrendingUp,
        features: ["Time Series Forecasting", "Anomaly Detection", "Risk Assessment", "Interactive Dashboards"],
        pricing: "From $199/month",
        badge: "Analytics",
        color: "from-orange-500 to-red-500"
      },
      {
        name: "Business Intelligence AI",
        description: "Transform raw data into actionable business insights with AI-powered analysis.",
        icon: BarChart3,
        features: ["Data Visualization", "Automated Reports", "KPI Tracking", "Competitive Analysis"],
        pricing: "From $149/month",
        badge: "Intelligence",
        color: "from-indigo-500 to-purple-500"
      },
      {
        name: "Real-time Decision Engine",
        description: "Instant AI-powered decision making and recommendations for critical business operations.",
        icon: Zap,
        features: ["Real-time Processing", "Rule Engine", "A/B Testing", "Performance Optimization"],
        pricing: "From $399/month",
        badge: "Real-time",
        color: "from-yellow-500 to-orange-500"
      }
    ]
  },
  {
    name: "AI Communication & Support",
    description: "Intelligent communication and customer support solutions",
    products: [
      {
        name: "Conversational AI Platform",
        description: "Advanced chatbots and virtual assistants for seamless customer interactions.",
        icon: MessageSquare,
        features: ["Natural Language Processing", "Multi-channel Support", "Sentiment Analysis", "Integration APIs"],
        pricing: "From $99/month",
        badge: "Communication",
        color: "from-teal-500 to-cyan-500"
      },
      {
        name: "Voice AI Solutions",
        description: "Speech recognition and voice-enabled applications for hands-free interactions.",
        icon: Mic,
        features: ["Speech-to-Text", "Voice Commands", "Audio Analytics", "Multi-language Support"],
        pricing: "From $179/month",
        badge: "Voice",
        color: "from-pink-500 to-rose-500"
      },
      {
        name: "Multilingual AI Support",
        description: "AI solutions supporting multiple languages and regions for global businesses.",
        icon: Globe,
        features: ["100+ Languages", "Cultural Adaptation", "Localization Tools", "Regional Compliance"],
        pricing: "From $249/month",
        badge: "Global",
        color: "from-violet-500 to-purple-500"
      }
    ]
  }
]

const stats = [
  { label: "Active Products", value: "12+", icon: Package },
  { label: "Enterprise Clients", value: "500+", icon: Building },
  { label: "API Calls/Month", value: "10M+", icon: Zap },
  { label: "Countries Served", value: "50+", icon: Globe }
]

export default function AIProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-slate-900"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <FloatingBrain size="lg" showVerification={true} />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6">
              AI Products Suite
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              Discover our comprehensive collection of AI-powered solutions designed to 
              <span className="text-purple-400 font-semibold"> transform your business</span> and 
              <span className="text-cyan-400 font-semibold"> accelerate innovation</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3">
                Explore Products
              </Button>
              <Button size="lg" variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3">
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30">
                    <stat.icon className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {productCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {category.name}
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.products.map((product, productIndex) => (
                  <Card key={productIndex} className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-purple-500/10">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${product.color} bg-opacity-20`}>
                          <product.icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                          {product.badge}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                        {product.name}
                      </CardTitle>
                      
                      <CardDescription className="text-slate-400 leading-relaxed">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-purple-300 mb-2">Key Features:</h4>
                          <ul className="space-y-1">
                            {product.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="text-sm text-slate-400 flex items-center">
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                          <div className="text-lg font-semibold text-white">
                            {product.pricing}
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using our AI products to drive innovation and growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 