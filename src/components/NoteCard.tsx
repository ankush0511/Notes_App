
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Note, Tag } from "@/types/notes";
import { formatDistanceToNow } from "date-fns";
import { Pin, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
  onTogglePin: (noteId: string) => void;
}

export function NoteCard({ note, onEdit, onDelete, onTogglePin }: NoteCardProps) {
  const formattedDate = formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true });
  
  // Truncate content if it's too long
  const truncatedContent = note.content.length > 150 
    ? note.content.substring(0, 150) + "..." 
    : note.content;

  return (
    <Card className={`note-card ${note.pinned ? 'border-primary' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{note.title}</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 ${note.pinned ? 'text-primary' : ''}`}
            onClick={() => onTogglePin(note.id)}
          >
            <Pin size={18} className={note.pinned ? 'fill-primary' : ''} />
            <span className="sr-only">Pin note</span>
          </Button>
        </div>
        <CardDescription className="text-xs">{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground whitespace-pre-line">
          {truncatedContent}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex gap-1">
          {note.tags.map((tag) => (
            <span 
              key={tag.id} 
              className="text-xs px-2 py-1 rounded-full" 
              style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
            >
              {tag.name}
            </span>
          ))}
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(note)}>
            <Edit size={16} />
            <span className="sr-only">Edit note</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onDelete(note.id)}>
            <Trash size={16} />
            <span className="sr-only">Delete note</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
