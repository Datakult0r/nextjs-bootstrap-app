"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CommentSectionProps {
  videoId: string
}

export default function CommentSection({ videoId }: CommentSectionProps) {
  const [commentText, setCommentText] = useState("")
  const [isCommenting, setIsCommenting] = useState(false)
  const [comments, setComments] = useState(mockComments)

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return

    const newComment = {
      id: `comment-${Date.now()}`,
      user: {
        name: "You",
        avatar: "/image/placeholder.svg?height=40&width=40",
      },
      text: commentText,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
      isDisliked: false,
      replies: [],
    }

    setComments([newComment, ...comments])
    setCommentText("")
    setIsCommenting(false)
  }

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          const wasLiked = comment.isLiked
          return {
            ...comment,
            likes: wasLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !wasLiked,
            isDisliked: false,
          }
        }
        return comment
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">{comments.length} Comments</h2>
        <Button variant="ghost" size="sm">
          Sort by
        </Button>
      </div>

      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/image/placeholder.svg?height=40&width=40" alt="Your avatar" />
          <AvatarFallback>YO</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onFocus={() => setIsCommenting(true)}
            className="resize-none"
            rows={isCommenting ? 3 : 1}
          />
          {isCommenting && (
            <div className="flex justify-end gap-2 mt-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setIsCommenting(false)
                  setCommentText("")
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleCommentSubmit} disabled={!commentText.trim()}>
                Comment
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
              <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{comment.user.name}</span>
                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
              </div>
              <p className="text-sm">{comment.text}</p>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleLikeComment(comment.id)}>
                  <ThumbsUp className={`h-4 w-4 ${comment.isLiked ? "fill-current" : ""}`} />
                </Button>
                <span className="text-xs">{comment.likes > 0 ? comment.likes : ""}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ThumbsDown className={`h-4 w-4 ${comment.isDisliked ? "fill-current" : ""}`} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Reply
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Report</DropdownMenuItem>
                    <DropdownMenuItem>Block user</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {comment.replies.length > 0 && (
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  View {comment.replies.length} replies
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Mock data
const mockComments = [
  {
    id: "comment-1",
    user: {
      name: "Alex Johnson",
      avatar: "/image/placeholder.svg?height=40&width=40",
    },
    text: "This is exactly what I needed! The authentication implementation is super helpful. Thanks for the detailed tutorial!",
    timestamp: "2 days ago",
    likes: 243,
    isLiked: false,
    isDisliked: false,
    replies: [
      {
        id: "reply-1",
        user: {
          name: "Dev Masters",
          avatar: "/image/placeholder.svg?height=40&width=40",
        },
        text: "Glad you found it helpful, Alex! Let me know if you have any questions.",
        timestamp: "1 day ago",
        likes: 12,
      },
    ],
  },
  {
    id: "comment-2",
    user: {
      name: "Sarah Miller",
      avatar: "/image/placeholder.svg?height=40&width=40",
    },
    text: "I've been trying to implement video editing in my app for weeks. Your approach is so much cleaner than what I was doing. Subscribed!",
    timestamp: "1 week ago",
    likes: 128,
    isLiked: false,
    isDisliked: false,
    replies: [],
  },
  {
    id: "comment-3",
    user: {
      name: "Tech Enthusiast",
      avatar: "/image/placeholder.svg?height=40&width=40",
    },
    text: "The live streaming feature is impressive. How does it handle scaling for many concurrent viewers?",
    timestamp: "3 days ago",
    likes: 56,
    isLiked: false,
    isDisliked: false,
    replies: [
      {
        id: "reply-2",
        user: {
          name: "Dev Masters",
          avatar: "/image/placeholder.svg?height=40&width=40",
        },
        text: "Great question! We're using WebRTC for small streams and HLS for larger audiences. I'll cover scaling in my next video!",
        timestamp: "2 days ago",
        likes: 24,
      },
    ],
  },
]

