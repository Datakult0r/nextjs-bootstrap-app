import Link from "next/link"
import Image from "next/image"

interface UserPlaylistsProps {
  username: string
}

export default function UserPlaylists({ username }: UserPlaylistsProps) {
  // Mock data - in a real app, this would come from your API
  const playlists = [
    {
      id: "1",
      title: "MERN Stack Development",
      thumbnail: "/image/placeholder.svg?height=180&width=320",
      videoCount: 12,
    },
    {
      id: "2",
      title: "React Tutorials",
      thumbnail: "/image/placeholder.svg?height=180&width=320",
      videoCount: 8,
    },
    {
      id: "3",
      title: "Database Design",
      thumbnail: "/image/placeholder.svg?height=180&width=320",
      videoCount: 5,
    },
    {
      id: "4",
      title: "CSS and UI Design",
      thumbnail: "/image/placeholder.svg?height=180&width=320",
      videoCount: 7,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {playlists.map((playlist) => (
        <Link key={playlist.id} href={`/playlist/${playlist.id}`} className="group">
          <div className="space-y-2">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              <Image
                src={playlist.thumbnail || "/placeholder.svg"}
                alt={playlist.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-medium">Play all</span>
              </div>
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                {playlist.videoCount} videos
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium line-clamp-2 text-sm">{playlist.title}</h3>
              <div className="text-xs text-muted-foreground">
                <span>View full playlist</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

