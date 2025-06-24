"use client"

import type React from "react"
import "@/styles/globals.css"
import { NotificationContainer } from "@/components/video-platform/notification"
import AdminProtectedRoute from "@/components/video-platform/AdminProtectedRoute"
import { usePathname } from "next/navigation"

export { meta as metadata } from "@/app/metadata"

type VideoPlatformLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function VideoPlatformLayout({ children }: VideoPlatformLayoutProps) {
  const pathname = usePathname()
  
  // List of routes that should be admin-protected
  const protectedRoutes = [
    '/video-platform/upload',  // Upload page
    '/video-platform/edit',    // Edit page (if exists)
    '/video-platform/settings' // Settings page (if exists)
  ]
  
  // Check if current path should be admin-protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  return (
    <>
      {isProtectedRoute ? (
        <AdminProtectedRoute>{children}</AdminProtectedRoute>
      ) : (
        children
      )}
      <NotificationContainer />
    </>
  )
}