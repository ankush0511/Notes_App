
import { Button } from "@/components/ui/button";
import { Tag } from "@/types/notes";
import { 
  FileText, 
  Tag as TagIcon, 
  Plus, 
  Home, 
  Settings, 
  Trash,
  CirclePlus
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "./ThemeToggle";

interface SidebarNavProps {
  tags: Tag[];
  activeTag: string | null;
  onTagClick: (tagId: string | null) => void;
  onCreateTag: (name: string, color: string) => void;
  onDeleteTag: (tagId: string) => void;
  onCreateNote: () => void;
}

const colors = [
  "#9b87f5", // purple
  "#f57187", // pink
  "#87f5b3", // green
  "#f5d587", // yellow
  "#87c8f5", // blue
];

export function SidebarNav({ 
  tags, 
  activeTag, 
  onTagClick, 
  onCreateTag, 
  onDeleteTag,
  onCreateNote
}: SidebarNavProps) {
  const [newTagName, setNewTagName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [open, setOpen] = useState(false);

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      onCreateTag(newTagName.trim(), selectedColor);
      setNewTagName("");
      setSelectedColor(colors[0]);
      setOpen(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col space-y-4 p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Notes App</h2>
        <ThemeToggle />
      </div>
      
      <Button 
        onClick={onCreateNote} 
        className="w-full justify-start gap-2"
      >
        <Plus size={18} /> New Note
      </Button>
      
      <div className="space-y-1 mt-6">
        <Button 
          variant={activeTag === null ? "secondary" : "ghost"} 
          className="w-full justify-start gap-2"
          onClick={() => onTagClick(null)}
        >
          <Home size={18} /> All Notes
        </Button>
      </div>
      
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Tags</h3>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <CirclePlus size={18} />
                <span className="sr-only">Add tag</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new tag</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="tag-name">Tag Name</Label>
                  <Input 
                    id="tag-name" 
                    value={newTagName} 
                    onChange={(e) => setNewTagName(e.target.value)} 
                    placeholder="Enter tag name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Tag Color</Label>
                  <div className="flex gap-2">
                    {colors.map((color) => (
                      <div 
                        key={color} 
                        className={`h-8 w-8 rounded-full cursor-pointer transition-all ${color === selectedColor ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleCreateTag}>Create Tag</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-y-1">
          {tags.map((tag) => (
            <Button 
              key={tag.id} 
              variant={activeTag === tag.id ? "secondary" : "ghost"} 
              className="w-full justify-start gap-2 group"
              onClick={() => onTagClick(tag.id)}
            >
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: tag.color }} />
              <span className="flex-1 text-left">{tag.name}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTag(tag.id);
                }}
              >
                <Trash size={14} />
                <span className="sr-only">Delete tag</span>
              </Button>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="mt-auto">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Settings size={18} /> Settings
        </Button>
      </div>
    </div>
  );
}
