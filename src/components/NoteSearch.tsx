
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SortOption } from "@/types/notes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NoteSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

export function NoteSearch({ 
  searchQuery, 
  onSearchChange, 
  sortOption, 
  onSortChange 
}: NoteSearchProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      <Select value={sortOption} onValueChange={(value) => onSortChange(value as SortOption)}>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="updated-newest">Last Updated (Newest)</SelectItem>
          <SelectItem value="updated-oldest">Last Updated (Oldest)</SelectItem>
          <SelectItem value="created-newest">Date Created (Newest)</SelectItem>
          <SelectItem value="created-oldest">Date Created (Oldest)</SelectItem>
          <SelectItem value="alphabetical">Alphabetical</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
