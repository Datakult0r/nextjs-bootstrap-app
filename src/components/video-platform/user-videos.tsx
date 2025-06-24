import Link from "next/link"
import Image from "next/image"

interface UserVideosProps {
  username: string
}

export default function UserVideos({ username }: UserVideosProps) {
  // Mock data - in a real app, this would come from your API
  const videos = [
    {
      id: "1",
      title: "Building a YouTube Clone with MERN Stack",
      thumbnail: "/image/placeholder.svg?height=180&width=320",
      views: "120K",
      timestamp: "3 days ago",
      duration: "12:34",
    },
    {
      id: "2",
      title: "React Hooks Explained: useEffect, useState, useContext",
      thumbnail: "/image/placeholder.svg?height=180&width=320",
      views: "45K",
      timestamp: "1 week ago",
      duration: "18:27",
    },
    {
      id: "3",
      title: "MongoDB Atlas Tutorial for Beginners",
      thumbnail: "/image/placeholder.svg?height=180&width=320",
      views: "78K",
      timestamp: "2 weeks ago",
      duration: "22:15",
    },
    {
      id: "4",
      title: "Tailwind CSS: From Zero to Hero",
      thumbnail: "/image/placeholder.svg?height=180&width=320",
      views: "230K",
      timestamp: "1 month ago",
      duration: "45:12",
    },
    {
      id: "5",
      title: "Node.js Authentication with Passport.js",
      thumbnail: "/image/placeholder.svg?height=180&width=320",
      views: "67K",
      timestamp: "3 weeks ago",
      duration: "32:45",
    },
    {
      id: "6",
      title: "Express.js REST API Development",
      thumbnail: "/image/placeholder.svg?height=180&width=320",
      views: "92K",
      timestamp: "5 days ago",
      duration: "28:19",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <Link key={video.id} href={`/video-platform/watch/${video.id}`} className="group">
          <div className="space-y-2">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              <Image
                src={video.thumbnail || "/image/placeholder.svg"}
                alt={video.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                {video.duration}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium line-clamp-2 text-sm">{video.title}</h3>
              <div className="flex flex-col text-xs text-muted-foreground">
                <span>
                  {video.views} views • {video.timestamp}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

