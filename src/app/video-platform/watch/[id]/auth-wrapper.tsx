'use client'

import { useRequireAuth } from '@/hooks/useRequireAuth'
import { Skeleton } from '@/components/ui/skeleton'

interface AuthenticatedVideoWrapperProps {
  children: React.ReactNode
}

export default function AuthenticatedVideoWrapper({ children }: AuthenticatedVideoWrapperProps) {
  const { isAuthenticated, isLoading } = useRequireAuth()
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <VideoContentSkeleton />
  }
  
  // Only render the content if authenticated
  return <>{children}</>
}

function VideoContentSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="w-full aspect-video rounded-lg" />
        </div>
        
        <div className="space-y-4 mt-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
      
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="w-32 h-20 rounded-md flex-shrink-0" />
              <div className="space-y-2 flex-grow">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 