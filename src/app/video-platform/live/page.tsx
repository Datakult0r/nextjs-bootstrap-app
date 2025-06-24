"use client"

import { useState } from "react"
import PageLayout from "@/components/video-platform/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, Radio } from "@/components/ui/radio-group"
import { Video, MessageSquare, Users, Share2 } from "lucide-react"

export default function LivePage() {
  const [isLive, setIsLive] = useState(false)

  return (
    <PageLayout title="Recommended" count={0} hidesearch={false}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Go Live</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg overflow-hidden bg-black aspect-video flex items-center justify-center">
              {isLive ? (
                <div className="text-center">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                    LIVE
                  </div>
                  <p className="text-white">You are currently streaming to 0 viewers</p>
                </div>
              ) : (
                <div className="text-center text-white">
                  <Video className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p>Your stream preview will appear here</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Stream Title
                </label>
                <Input id="title" placeholder="Add a title that describes your stream" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea id="description" placeholder="Tell viewers about your stream" rows={3} />
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant={isLive ? "destructive" : "default"} size="lg" onClick={() => setIsLive(!isLive)}>
                {isLive ? "End Stream" : "Go Live"}
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-lg p-4 border">
              <h3 className="text-lg font-medium mb-4">Stream Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="chat">Live Chat</Label>
                    <p className="text-sm text-muted-foreground">Allow viewers to chat during your stream</p>
                  </div>
                  <Switch id="chat" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Privacy</Label>
                  <RadioGroup defaultValue="public">
                    <div className="flex items-center space-x-2">
                      <Radio id="public" value="public" />
                      <Label htmlFor="public">Public</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Radio id="unlisted" value="unlisted" />
                      <Label htmlFor="unlisted">Unlisted</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Radio id="private" value="private" />
                      <Label htmlFor="private">Private</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Stream Quality</Label>
                  <RadioGroup defaultValue="auto">
                    <div className="flex items-center space-x-2">
                      <Radio id="auto" value="auto" />
                      <Label htmlFor="auto">Auto (Recommended)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Radio id="720p" value="720p" />
                      <Label htmlFor="720p">720p</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Radio id="1080p" value="1080p" />
                      <Label htmlFor="1080p">1080p</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            {isLive && (
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="text-lg font-medium mb-4">Stream Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Viewers</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Chat Messages</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Share Your Stream</p>
                      <Input value="https://aiplatform.com/live/username" readOnly className="mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

