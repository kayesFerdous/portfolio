"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchFilterProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  sortBy: "newest" | "popular"
  onSortChange: (sort: "newest" | "popular") => void
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
}

export function SearchFilter({ searchTerm, onSearchChange, sortBy, onSortChange }: SearchFilterProps) {
  return (
    <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex gap-2">
        <Button variant={sortBy === "newest" ? "default" : "outline"} size="sm" onClick={() => onSortChange("newest")}>
          Newest
        </Button>
        <Button className=""
          variant={sortBy === "popular" ? "default" : "outline"}
          size="sm"
          onClick={() => onSortChange("popular")}
        >
          Popular
        </Button>
      </div>
    </div>
  )
}
