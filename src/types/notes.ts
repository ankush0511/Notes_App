
export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  pinned: boolean;
}

export type SortOption = 'created-newest' | 'created-oldest' | 'updated-newest' | 'updated-oldest' | 'alphabetical';

export type ViewMode = 'grid' | 'list';
