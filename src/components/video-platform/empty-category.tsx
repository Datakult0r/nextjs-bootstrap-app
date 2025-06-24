import PageLayout from "@/components/video-platform/page-layout"

interface EmptyCategoryProps {
  title: string
}

export default function EmptyCategory({ title }: EmptyCategoryProps) {
  return (
    <PageLayout title="Recommended" count={0} hidesearch={false}>
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="flex flex-col items-center justify-center text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <span className="text-4xl text-muted-foreground">0</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">No content found</h2>
          <p className="text-muted-foreground">
            There are currently no items in this category. Check back later or explore other categories.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}

