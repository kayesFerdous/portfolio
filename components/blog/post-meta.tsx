import { Calendar, Clock, Tag } from "lucide-react"

interface PostMetaProps {
  date: string
  readingTime: number
  tags: string[]
}

export function PostMeta({ date, readingTime, tags }: PostMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
      <span className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        {new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </span>

      <span className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        {readingTime} min read
      </span>

      {tags.length > 0 && (
        <span className="flex items-center gap-2">
          <Tag className="h-4 w-4" />
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary">
                {tag}
              </span>
            ))}
          </div>
        </span>
      )}
    </div>
  )
}
