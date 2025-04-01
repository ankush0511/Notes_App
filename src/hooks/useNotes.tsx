
import { useState, useEffect } from "react";
import { Note, Tag, SortOption } from "@/types/notes";
import { loadNotes, saveNotes, loadTags, saveTags, generateId } from "@/utils/notesStorage";
import { useToast } from "@/components/ui/use-toast";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("updated-newest");
  const { toast } = useToast();

  // Load notes and tags from localStorage
  useEffect(() => {
    setNotes(loadNotes());
    setTags(loadTags());
  }, []);

  // Save notes and tags to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      saveNotes(notes);
    }
  }, [notes]);

  useEffect(() => {
    if (tags.length > 0) {
      saveTags(tags);
    }
  }, [tags]);

  // Filter and sort notes
  useEffect(() => {
    let filtered = [...notes];

    // Filter by active tag
    if (activeTag) {
      filtered = filtered.filter((note) =>
        note.tags.some((tag) => tag.id === activeTag)
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      );
    }

    // Sort notes
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "created-newest":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "created-oldest":
          return a.createdAt.getTime() - b.createdAt.getTime();
        case "updated-newest":
          return b.updatedAt.getTime() - a.updatedAt.getTime();
        case "updated-oldest":
          return a.updatedAt.getTime() - b.updatedAt.getTime();
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    // Pin notes at the top
    const pinnedNotes = filtered.filter((note) => note.pinned);
    const unpinnedNotes = filtered.filter((note) => !note.pinned);
    setFilteredNotes([...pinnedNotes, ...unpinnedNotes]);
  }, [notes, activeTag, searchQuery, sortOption]);

  // Create a new note
  const createNote = () => {
    const newNote: Note = {
      id: generateId("note"),
      title: "New Note",
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [],
      pinned: false,
    };
    setNotes([newNote, ...notes]);
    toast({
      title: "Note Created",
      description: "Your new note has been created successfully.",
    });
    return newNote;
  };

  // Update a note
  const updateNote = (updatedNote: Note) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id
        ? { ...updatedNote, updatedAt: new Date() }
        : note
    );
    setNotes(updatedNotes);
  };

  // Delete a note
  const deleteNote = (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId));
    toast({
      title: "Note Deleted",
      description: "Your note has been deleted.",
    });
  };

  // Toggle pin status
  const togglePin = (noteId: string) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  // Add a tag to a note
  const addTagToNote = (noteId: string, tagId: string) => {
    const tag = tags.find((t) => t.id === tagId);
    if (!tag) return;

    setNotes(
      notes.map((note) => {
        if (note.id === noteId) {
          // Check if tag already exists on the note
          if (note.tags.some((t) => t.id === tagId)) {
            return note;
          }
          return {
            ...note,
            tags: [...note.tags, tag],
            updatedAt: new Date(),
          };
        }
        return note;
      })
    );
  };

  // Remove a tag from a note
  const removeTagFromNote = (noteId: string, tagId: string) => {
    setNotes(
      notes.map((note) => {
        if (note.id === noteId) {
          return {
            ...note,
            tags: note.tags.filter((tag) => tag.id !== tagId),
            updatedAt: new Date(),
          };
        }
        return note;
      })
    );
  };

  // Create a new tag
  const createTag = (name: string, color: string) => {
    const newTag: Tag = {
      id: generateId("tag"),
      name,
      color,
    };
    setTags([...tags, newTag]);
    toast({
      title: "Tag Created",
      description: `Tag "${name}" has been created.`,
    });
    return newTag;
  };

  // Delete a tag
  const deleteTag = (tagId: string) => {
    // Remove the tag from all notes first
    const updatedNotes = notes.map((note) => ({
      ...note,
      tags: note.tags.filter((tag) => tag.id !== tagId),
    }));
    setNotes(updatedNotes);

    // Remove the tag itself
    setTags(tags.filter((tag) => tag.id !== tagId));
    
    // Clear active tag if it's the one being deleted
    if (activeTag === tagId) {
      setActiveTag(null);
    }
    
    toast({
      title: "Tag Deleted",
      description: "The tag has been deleted from all notes.",
    });
  };

  return {
    notes,
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
  };
};
