
import { useState } from "react";
import { NoteCard } from "@/components/NoteCard";
import { SidebarNav } from "@/components/SidebarNav";
import { NoteSearch } from "@/components/NoteSearch";
import { NoteEditor } from "@/components/NoteEditor";
import { useNotes } from "@/hooks/useNotes";
import { Note } from "@/types/notes";
import { useIsMobile } from "@/hooks/use-mobile";
import { EmptyState } from "@/components/EmptyState";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Index = () => {
  const {
    filteredNotes,
    tags,
    activeTag,
    searchQuery,
    sortOption,
    setActiveTag,
    setSearchQuery,
    setSortOption,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
    addTagToNote,
    removeTagFromNote,
    createTag,
    deleteTag,
  } = useNotes();

  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleCreateNote = () => {
    const newNote = createNote();
    setEditingNote(newNote);
    setIsEditorOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleDeleteNote = (noteId: string) => {
    setNoteToDelete(noteId);
  };

  const confirmDeleteNote = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete);
      setNoteToDelete(null);
    }
  };

  const handleSaveNote = (updatedNote: Note) => {
    updateNote(updatedNote);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile sidebar trigger */}
      {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="fixed top-4 left-4 z-10">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SidebarNav
              tags={tags}
              activeTag={activeTag}
              onTagClick={setActiveTag}
              onCreateTag={createTag}
              onDeleteTag={deleteTag}
              onCreateNote={handleCreateNote}
            />
          </SheetContent>
        </Sheet>
      )}

      {/* Desktop sidebar */}
      {!isMobile && (
        <div className="hidden md:block w-64 border-r">
          <SidebarNav
            tags={tags}
            activeTag={activeTag}
            onTagClick={setActiveTag}
            onCreateTag={createTag}
            onDeleteTag={deleteTag}
            onCreateNote={handleCreateNote}
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <NoteSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />

          {filteredNotes.length > 0 ? (
            <div className="note-card-grid">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                  onTogglePin={() => togglePin(note.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              message={
                searchQuery
                  ? "No notes found"
                  : "No notes yet"
              }
              buttonText="Create Note"
              onAction={handleCreateNote}
              isSearchResults={!!searchQuery}
            />
          )}
        </div>
      </div>

      {/* Note editor dialog */}
      <NoteEditor
        note={editingNote}
        open={isEditorOpen}
        onOpenChange={setIsEditorOpen}
        onSave={handleSaveNote}
        availableTags={tags}
        onAddTag={addTagToNote}
        onRemoveTag={removeTagFromNote}
      />

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!noteToDelete} onOpenChange={(open) => !open && setNoteToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteNote}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
