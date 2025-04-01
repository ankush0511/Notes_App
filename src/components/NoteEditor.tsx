
import { Note, Tag } from "@/types/notes";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NoteEditorProps {
  note: Note | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (note: Note) => void;
  availableTags: Tag[];
  onAddTag: (noteId: string, tagId: string) => void;
  onRemoveTag: (noteId: string, tagId: string) => void;
}

export function NoteEditor({ 
  note, 
  open, 
  onOpenChange, 
  onSave, 
  availableTags,
  onAddTag,
  onRemoveTag
}: NoteEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  if (!note) return null;

  const handleSave = () => {
    onSave({
      ...note,
      title: title.trim() || "Untitled",
      content,
    });
    onOpenChange(false);
  };

  const handleAddTag = () => {
    if (selectedTag) {
      onAddTag(note.id, selectedTag);
      setSelectedTag("");
    }
  };

  // Filter out tags that are already in the note
  const unusedTags = availableTags.filter(
    (tag) => !note.tags.some((t) => t.id === tag.id)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Textarea
              placeholder="Note content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="h-40 resize-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <Badge
                key={tag.id}
                style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                className="gap-1"
              >
                {tag.name}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0"
                  onClick={() => onRemoveTag(note.id, tag.id)}
                >
                  <X size={12} />
                  <span className="sr-only">Remove tag</span>
                </Button>
              </Badge>
            ))}
          </div>
          {unusedTags.length > 0 && (
            <div className="flex gap-2">
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Add a tag" />
                </SelectTrigger>
                <SelectContent>
                  {unusedTags.map((tag) => (
                    <SelectItem key={tag.id} value={tag.id}>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: tag.color }}
                        />
                        {tag.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAddTag}>Add</Button>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Note</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
