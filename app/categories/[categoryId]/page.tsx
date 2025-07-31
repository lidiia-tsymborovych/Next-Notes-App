'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Note } from '@/app/types/note';
import { deleteNote, getAllCategories, updateNote } from '@/lib/api';
import { CategoryItem } from '@/app/types/category';
import { NavigationActions } from '@/app/components/NavigationActions';
import { AddNoteDialog } from '@/app/components/AddNoteDialog';
import { NoteCard } from '@/app/components/NoteCard';

export default function CategoryNotesPage() {
  const { categoryId } = useParams();

  const [category, setCategory] = useState<CategoryItem | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!categoryId) return;

  setLoading(true);
  getAllCategories()
    .then(categories => {
      const foundCategory =
        categories.find(cat => cat.id === Number(categoryId)) || null;
      setCategory(foundCategory);
      setNotes(foundCategory?.notes || []);
    })
    .catch(error => {
      alert((error as Error).message);
    })
    .finally(() => {
      setLoading(false);
    });
}, [categoryId]);


  const handleNoteCreated = (note: Note) => {
    setNotes(prev => [...prev, note]);
  };

  const handleNoteEdit = async (updatedNote: Note) => {
    try {
      const savedNote = await updateNote(updatedNote.id, {
        title: updatedNote.title,
        content: updatedNote.content,
      });

      setNotes(prev => prev.map(n => (n.id === savedNote.id ? savedNote : n)));
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleNoteDelete = async (id: number) => {
    try {
      await deleteNote(id);
      setNotes(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      alert((error as Error).message);
    }
  };


  if (loading)
    return <p className='text-center text-gray-400 mt-8'>Loading...</p>;

  if (!category)
    return (
      <p className='text-center text-red-500 mt-8'>Category not found 🫠</p>
    );
  
  const title = category.title[0].toUpperCase() + category.title.slice(1);
  const isNotesEmpty = notes.length === 0; 

  return (
    <div className='flex flex-col max-w-6xl mx-auto gap-6 sm:gap-8 px-4 sm:px-8'>
      <header className='flex flex-col'>
        <NavigationActions />
        <h1 className='text-[32px] md:text-[48px] lg:text-[56px] text-center text-[var(--foreground)] font-bold mt-16'>
          {title} Notes
        </h1>
      </header>

      <section className='w-full flex flex-col'>
        <AddNoteDialog
          categoryId={category.id}
          onNoteCreated={handleNoteCreated}
          isNotesEmpty={isNotesEmpty}
        />

        {isNotesEmpty ? (
          <p className='self-center gap-4 text-[var(--foreground)]/60 text-lg sm:text-xl'>
            No notes in this category yet
          </p>
        ) : (
          <div className='flex flex-col gap-4 w-full'>
            {notes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleNoteDelete}
                onEdit={handleNoteEdit}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
