import { Suspense } from "react"
import PageLayout from "@/components/video-platform/page-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Bell, Share2 } from "lucide-react"
import UserVideos from "@/components/video-platform/user-videos"
import UserPlaylists from "@/components/video-platform/user-playlists"
import UserAbout from "@/components/video-platform/user-about"

export default function ProfilePage() {
  // Mock data - in a real app, this would come from your API
  const videoCount = 6
  const playlistCount = 4

  return (
    <PageLayout title="Recommended" count={videoCount + playlistCount} hidesearch={false}>
      <div className="space-y-6">
        <div className="relative">
          <div className="h-32 md:h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
          <div className="absolute -bottom-12 left-4 md:left-6">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src="/image/placeholder.svg?height=96&width=96" alt="Channel avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="pt-14 md:pt-16 flex flex-col md:flex-row md:items-center gap-4">
          <div className="space-y-1 flex-1">
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-muted-foreground">@johndoe • 120K subscribers</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="videos">
          <TabsList>
            <TabsTrigger value="videos">
              Videos <span className="ml-1 text-xs text-muted-foreground">({videoCount})</span>
            </TabsTrigger>
            <TabsTrigger value="playlists">
              Playlists <span className="ml-1 text-xs text-muted-foreground">({playlistCount})</span>
            </TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="videos" className="mt-6">
            <Suspense fallback={<UserVideosSkeleton />}>
              <UserVideos username="johndoe" />
            </Suspense>
          </TabsContent>
          <TabsContent value="playlists" className="mt-6">
            <Suspense fallback={<UserPlaylistsSkeleton />}>
              <UserPlaylists username="johndoe" />
            </Suspense>
          </TabsContent>
          <TabsContent value="about" className="mt-6">
            <Suspense fallback={<UserAboutSkeleton />}>
              <UserAbout username="johndoe" />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}

function UserVideosSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="w-full aspect-video rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        ))}
    </div>
  )
}

function UserPlaylistsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="w-full aspect-video rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
    </div>
  )
}

function UserAboutSkeleton() {
  return (
    <div className="space-y-4 max-w-2xl">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="pt-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48 mt-2" />
      </div>
    </div>
  )
}

