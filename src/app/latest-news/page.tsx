import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FloatingBrain } from '@/components/animations/floating-brain'
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Rocket,
  Globe,
  Users,
  BarChart3,
  MessageSquare,
  ArrowRight,
  ExternalLink
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Latest News | CoAI - AI Industry Updates & Insights',
  description: 'Stay updated with the latest AI industry news, product updates, and insights from CoAI.',
}

const featuredNews = {
  title: "CoAI Launches Revolutionary AI-DevSecOps Platform",
  description: "Our new AI-powered security platform integrates seamlessly with existing DevOps workflows, providing real-time threat detection and automated security responses.",
  image: "/api/placeholder/800/400",
  date: "2024-01-15",
  readTime: "5 min read",
  category: "Product Launch",
  badge: "Featured",
  color: "from-purple-600 to-cyan-600"
}

const newsCategories = [
  {
    name: "Product Updates",
    icon: Rocket,
    color: "from-blue-500 to-cyan-500",
    articles: [
      {
        title: "Enhanced AI-Architect Learning Path Now Available",
        description: "New modules covering advanced system design patterns and AI ethics have been added to our flagship education program.",
        date: "2024-01-12",
        readTime: "3 min read",
        category: "Education",
        badge: "New"
      },
      {
        title: "Enterprise AI Suite 3.0 Beta Release",
        description: "Major performance improvements and new analytics capabilities are now available for beta testing.",
        date: "2024-01-10",
        readTime: "4 min read",
        category: "Enterprise",
        badge: "Beta"
      },
      {
        title: "Voice AI Solutions Multilingual Support",
        description: "Added support for 25 new languages including regional dialects and cultural adaptations.",
        date: "2024-01-08",
        readTime: "2 min read",
        category: "AI Products",
        badge: "Update"
      }
    ]
  },
  {
    name: "Industry Insights",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
    articles: [
      {
        title: "The Future of AI in Manufacturing: 2024 Trends",
        description: "Exploring how AI is revolutionizing manufacturing processes, from predictive maintenance to quality control.",
        date: "2024-01-14",
        readTime: "6 min read",
        category: "Manufacturing",
        badge: "Trending"
      },
      {
        title: "AI Ethics in Healthcare: Balancing Innovation and Privacy",
        description: "A deep dive into the ethical considerations when implementing AI solutions in healthcare environments.",
        date: "2024-01-11",
        readTime: "8 min read",
        category: "Healthcare",
        badge: "Analysis"
      },
      {
        title: "Small Business AI Adoption: Success Stories",
        description: "How small businesses are leveraging AI tools to compete with larger enterprises and drive growth.",
        date: "2024-01-09",
        readTime: "5 min read",
        category: "Small Business",
        badge: "Case Study"
      }
    ]
  },
  {
    name: "Company News",
    icon: Users,
    color: "from-purple-500 to-pink-500",
    articles: [
      {
        title: "CoAI Expands to European Markets",
        description: "New offices in London and Berlin will serve our growing European customer base with localized support.",
        date: "2024-01-13",
        readTime: "3 min read",
        category: "Expansion",
        badge: "Announcement"
      },
      {
        title: "Partnership with Leading Cloud Providers",
        description: "Strategic partnerships with major cloud platforms to enhance our AI infrastructure capabilities.",
        date: "2024-01-07",
        readTime: "4 min read",
        category: "Partnership",
        badge: "Business"
      },
      {
        title: "CoAI Team Wins AI Innovation Award",
        description: "Recognition for our groundbreaking work in conversational AI and natural language processing.",
        date: "2024-01-05",
        readTime: "2 min read",
        category: "Awards",
        badge: "Achievement"
      }
    ]
  }
]

const quickStats = [
  { label: "Articles Published", value: "150+", icon: MessageSquare },
  { label: "Industry Reports", value: "25+", icon: BarChart3 },
  { label: "Expert Interviews", value: "50+", icon: Users },
  { label: "Monthly Readers", value: "10K+", icon: Globe }
]

export default function LatestNewsPage() {
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
              Latest News
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              Stay ahead of the curve with the latest 
              <span className="text-purple-400 font-semibold"> AI industry insights</span>, 
              <span className="text-cyan-400 font-semibold"> product updates</span>, and 
              <span className="text-green-400 font-semibold"> company news</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {quickStats.map((stat, index) => (
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

      {/* Featured Article */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Story</h2>
            <p className="text-xl text-slate-400">Our most important news and updates</p>
          </div>
          
          <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 max-w-4xl mx-auto">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <Badge className={`bg-gradient-to-r ${featuredNews.color} text-white`}>
                  {featuredNews.badge}
                </Badge>
                <div className="flex items-center text-slate-400 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(featuredNews.date).toLocaleDateString()}
                  <Clock className="w-4 h-4 ml-4 mr-2" />
                  {featuredNews.readTime}
                </div>
              </div>
              
              <CardTitle className="text-2xl md:text-3xl text-white mb-4">
                {featuredNews.title}
              </CardTitle>
              
              <CardDescription className="text-slate-300 text-lg leading-relaxed">
                {featuredNews.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-purple-400 text-purple-300">
                  {featuredNews.category}
                </Badge>
                <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* News Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {newsCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-20">
              <div className="flex items-center mb-12">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} bg-opacity-20 mr-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {category.name}
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.articles.map((article, articleIndex) => (
                  <Card key={articleIndex} className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-purple-500/10">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                          {article.badge}
                        </Badge>
                        <div className="flex items-center text-slate-400 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors mb-3">
                        {article.title}
                      </CardTitle>
                      
                      <CardDescription className="text-slate-400 leading-relaxed">
                        {article.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-slate-400 text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(article.date).toLocaleDateString()}
                        </div>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {article.category}
                        </Badge>
                      </div>
                      
                      <Button variant="ghost" className="w-full mt-4 text-purple-400 hover:text-white hover:bg-purple-600/20">
                        Read More
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss important AI industry updates and product announcements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
            />
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 