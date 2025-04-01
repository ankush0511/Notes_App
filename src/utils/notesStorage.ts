
import { Note, Tag } from "@/types/notes";

// Default tags
const defaultTags: Tag[] = [
  { id: "tag-1", name: "Personal", color: "#9b87f5" },
  { id: "tag-2", name: "Work", color: "#f57187" },
  { id: "tag-3", name: "Ideas", color: "#87f5b3" },
];

// Sample notes (for initial data)
const sampleNotes: Note[] = [
  {
    id: "note-1",
    title: "Welcome to Notes App",
    content: "This is your new notes app! Create, edit, and organize your notes easily.",
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [defaultTags[0]],
    pinned: true,
  },
  {
    id: "note-2",
    title: "Shopping List",
    content: "- Milk\n- Eggs\n- Bread\n- Fruits",
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000),
    tags: [defaultTags[0]],
    pinned: false,
  },
  {
    id: "note-3",
    title: "Project Ideas",
    content: "1. Mobile app for task management\n2. Web app for note taking\n3. E-commerce platform",
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    updatedAt: new Date(Date.now() - 172800000),
    tags: [defaultTags[1], defaultTags[2]],
    pinned: false,
  },
];

// LocalStorage keys
const NOTES_STORAGE_KEY = "notes-app-notes";
const TAGS_STORAGE_KEY = "notes-app-tags";

// Load notes from localStorage
export const loadNotes = (): Note[] => {
  const storedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
  if (storedNotes) {
    const parsedNotes = JSON.parse(storedNotes);
    // Convert string dates back to Date objects
    return parsedNotes.map((note: any) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt),
    }));
  }
  // Return sample notes if no stored notes found
  return sampleNotes;
};

// Save notes to localStorage
export const saveNotes = (notes: Note[]): void => {
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
};

// Load tags from localStorage
export const loadTags = (): Tag[] => {
  const storedTags = localStorage.getItem(TAGS_STORAGE_KEY);
  if (storedTags) {
    return JSON.parse(storedTags);
  }
  // Return default tags if no stored tags found
  return defaultTags;
};

// Save tags to localStorage
export const saveTags = (tags: Tag[]): void => {
  localStorage.setItem(TAGS_STORAGE_KEY, JSON.stringify(tags));
};

// Generate a unique ID
export const generateId = (prefix: string): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};
