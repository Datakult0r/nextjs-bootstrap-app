"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  Flame,
  Bell,
  History,
  Route,
  Swords,
  Newspaper,
  Brain,
  Atom,
  Building2,
  Stethoscope,
  FolderKanban,
  Cpu,
  Code2,
  Coffee,
  Globe,
} from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const mainLinks = [
    { href: "/video-platform", label: "Home", icon: Home },
    { href: "/video-platform/trending", label: "Trending", icon: Flame },
    { href: "/video-platform/subscriptions", label: "Subscribe", icon: Bell },
  ]

  const libraryLinks = [
    { href: "/video-platform/history", label: "History", icon: History },
    { href: "/video-platform/my-pathway", label: "My Pathway", icon: Route },
    { href: "/video-platform/ai-arena", label: "AI Arena", icon: Swords },
  ]

  const subscriptionLinks = [
    { href: "/video-platform/channel/ai-ml-news", label: "AI/ML News", icon: Newspaper },
    { href: "/video-platform/channel/cybernetics", label: "Cybernetics", icon: Brain },
    { href: "/video-platform/channel/polymatheism", label: "Polymatheism", icon: Atom },
    { href: "/video-platform/channel/new-realty", label: "The New Realty", icon: Building2 },
    { href: "/video-platform/channel/clinic-of-ai", label: "Clinic Of AI", icon: Stethoscope },
  ]

  const exploreLinks = [
    { href: "/video-platform/explore/projects", label: "Projects", icon: FolderKanban },
    { href: "/video-platform/explore/ai-system-design", label: "AI System Design", icon: Cpu },
    { href: "/video-platform/explore/100x-ai-developer", label: "100x AI Developer", icon: Code2 },
    { href: "/video-platform/explore/ai-and-chill", label: "AI & Chill", icon: Coffee },
    { href: "/video-platform/explore/virtual-worlds", label: "Virtual Worlds", icon: Globe },
  ]

  return (
    <aside className="w-60 flex-col border-r bg-background h-full overflow-hidden">
      <ScrollArea className="flex-1 py-4">
        <nav className="px-4 space-y-6">
          <div className="space-y-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${pathname === link.href
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
                  }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground">Library</h3>
            <div className="space-y-1">
              {libraryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${pathname === link.href
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground">Subscriptions</h3>
            <div className="space-y-1">
              {subscriptionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${pathname === link.href
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground">Explore</h3>
            <div className="space-y-1">
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${pathname === link.href
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </ScrollArea>
    </aside>
  )
}

