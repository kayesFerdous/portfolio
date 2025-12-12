export default function BlogLoading() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-pulse">
          <div className="h-16 bg-muted rounded-lg w-64 mx-auto mb-6" />
          <div className="h-6 bg-muted rounded-lg w-96 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-video bg-muted rounded-xl mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
