
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  message: string;
  buttonText: string;
  onAction: () => void;
  isSearchResults?: boolean;
}

export function EmptyState({ 
  message, 
  buttonText, 
  onAction, 
  isSearchResults = false 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-12">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <FileText size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-medium text-center">{message}</h3>
      <p className="text-muted-foreground text-center mt-2">
        {isSearchResults 
          ? "Try a different search term or create a new note."
          : "Create your first note to get started."
        }
      </p>
      <Button onClick={onAction} className="mt-4 flex items-center gap-2">
        <Plus size={16} /> {buttonText}
      </Button>
    </div>
  );
}
