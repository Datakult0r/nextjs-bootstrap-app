import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  totalVideos: number;
  filteredCount: number;
}

export function SearchBar({
  searchQuery,
  setSearchQuery,
  setCurrentPage,
  totalVideos,
  filteredCount,
}: SearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
      <div className="relative w-full md:w-64">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search videos"
          className="pl-10 pr-4"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
      </div>
      <div className="flex items-center text-sm text-muted-foreground">
        Showing {filteredCount} of {totalVideos} videos
      </div>
    </div>
  );
} 