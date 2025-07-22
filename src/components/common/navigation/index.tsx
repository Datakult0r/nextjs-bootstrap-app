'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { navLinks } from '@/constants/nav-links'
import { AIAgencyPanel } from './dropdown-panel/ai-agency-panel'
import { AIEducationPanel } from './dropdown-panel/ai-education-panel'
import { cn } from '@/libs/utils'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border/50 shadow-lg'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg bg-gradient-to-r from-teal-500 to-purple-500 p-2"
          >
            <Zap className="h-5 w-5 text-white" />
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">
            Europa.exe
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-1 lg:flex">
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.href ? (
                <Link
                  href={link.href}
                  className="group relative px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground"
                >
                  <span className="relative z-10">{link.name}</span>
                  <motion.div
                    className="absolute inset-0 rounded-md bg-accent opacity-0 group-hover:opacity-100"
                    layoutId="navbar-hover"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                </Link>
              ) : (
                <button
                  onClick={() => handleDropdownToggle(link.name)}
                  className="group flex items-center space-x-1 px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground"
                >
                  <span>{link.name}</span>
                  <motion.div
                    animate={{ rotate: activeDropdown === link.name ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>
              )}

              {/* Dropdown Panels */}
              <AnimatePresence>
                {activeDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2"
                    onMouseLeave={closeDropdown}
                  >
                    <div className="rounded-xl border border-border/50 bg-background/95 backdrop-blur-md shadow-2xl">
                      {link.name === 'AI-Agency' && <AIAgencyPanel />}
                      {link.name === 'AI-Education' && <AIEducationPanel />}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden items-center space-x-3 lg:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign In
          </Link>
          <Button
            asChild
            className="bg-gradient-to-r from-teal-500 to-purple-500 text-white hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <Link href="/cerebro">Enter Metaverse</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden"
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border/50 bg-background/95 backdrop-blur-md lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.href ? (
                    <Link
                      href={link.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <div className="space-y-2">
                      <div className="px-3 py-2 text-base font-medium text-foreground">
                        {link.name}
                      </div>
                      {link.name === 'AI-Education' && link.menu && (
                        <div className="ml-4 space-y-1">
                          {link.menu.map((path) => (
                            <Link
                              key={path.name}
                              href={path.href}
                              className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                              onClick={() => setIsOpen(false)}
                            >
                              {path.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
              
              <div className="mt-4 space-y-2 border-t border-border/50 pt-4">
                <Link
                  href="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white"
                >
                  <Link href="/cerebro" onClick={() => setIsOpen(false)}>
                    Enter Metaverse
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for dropdowns */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={closeDropdown}
          />
        )}
      </AnimatePresence>
    </motion.header>
  )
}
