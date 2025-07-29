export type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number;
  userId: number;
};

export type NoteWithoutId = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;