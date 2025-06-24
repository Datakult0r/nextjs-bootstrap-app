interface UserAboutProps {
  username: string
}

export default function UserAbout({ username }: UserAboutProps) {
  // Mock data - in a real app, this would come from your API
  const user = {
    name: "John Doe",
    joinDate: "Jan 15, 2020",
    totalViews: "2.5M",
    description: `Welcome to my channel! I'm a full-stack developer passionate about teaching web development and creating helpful tutorials.

I focus on the MERN stack (MongoDB, Express.js, React.js, and Node.js) and modern web technologies. My goal is to break down complex concepts into easy-to-understand tutorials.

New videos every week covering:
- Full-stack web development
- React.js and Next.js
- Node.js and Express
- Database design and implementation
- Authentication and security
- UI/UX design with Tailwind CSS

Don't forget to subscribe for the latest tutorials!`,
    links: [
      { title: "GitHub", url: "https://github.com/johndoe" },
      { title: "Twitter", url: "https://twitter.com/johndoe" },
      { title: "Personal Website", url: "https://johndoe.dev" },
    ],
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="whitespace-pre-line">{user.description}</div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Stats</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Joined</p>
            <p className="font-medium">{user.joinDate}</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Total Views</p>
            <p className="font-medium">{user.totalViews}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Links</h3>
        <div className="space-y-1">
          {user.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary hover:underline"
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

