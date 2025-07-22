import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'

interface TeamMember {
  name: string
  role: string
  image: {
    url: string
    alt: string
  }
  socialLink: string
}

interface TeamSectionProps {
  title: string
  heading: string
  paragraph: string
  members: TeamMember[]
}

export function TeamSection({ title, heading, paragraph, members }: TeamSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white mb-4">
            {title}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6">
            {heading}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {paragraph}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-purple-500/10">
              <CardContent className="p-6 text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-purple-500/30 group-hover:border-purple-400 transition-colors">
                    <Image
                      src={member.image.url}
                      alt={member.image.alt}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {member.name}
                </h3>
                
                <Badge variant="outline" className="border-purple-400 text-purple-300 mb-4">
                  {member.role}
                </Badge>

                <div className="flex justify-center space-x-3">
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-purple-400 hover:bg-purple-600/20">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-600/20">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-blue-400 hover:bg-blue-600/20">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-green-400 hover:bg-green-600/20">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Team Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">6+</div>
            <div className="text-slate-400">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">10+</div>
            <div className="text-slate-400">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-slate-400">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-slate-400">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  )
} 