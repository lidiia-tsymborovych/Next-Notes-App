'use client';

import { useEffect, useState } from 'react';;

import { updateNote, deleteNote } from '@/lib/api';

import { Note } from '@prisma/client';
import { CategoryItem } from '@/app/types/category';
import { Header } from '../home/Header';
import { NoteCardSkeleton } from '../notes/NoteCardSkeleton';
import { NoteCard } from '../notes/NoteCard';
import { AddNoteDialog } from '../notes/AddNoteDialog';


type Props = {
  category: CategoryItem;
};

export function CategoryNotesClient({ category }: Props) {
  const [notes, setNotes] = useState<Note[]>(category.notes || []);
  const [loading, setLoading] = useState(true); 
  const isNotesEmpty = notes.length === 0;
  const title = category.title[0].toUpperCase() + category.title.slice(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className='flex flex-col max-w-6xl mx-auto gap-6 sm:gap-8 px-4 pb-16 sm:px-8 pt-20'>

        <Header />
        <h1 className='text-[32px] md:text-[48px] lg:text-[56px] text-center text-[var(--foreground)] font-bold'>
          {`${title} Notes`}
        </h1>
    

      <section className='w-full flex flex-col'>
        <div className='flex flex-col gap-4 w-full'>
          {loading ? (
            [...Array(4)].map((_, i) => <NoteCardSkeleton key={i} />)
          ) : isNotesEmpty ? (
            <p className='self-center text-[var(--foreground)]/60 text-lg sm:text-xl'>
              No notes in this category yet
            </p>
          ) : (
            notes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleNoteDelete}
                onEdit={handleNoteEdit}
              />
            ))
          )}
        </div>

        <AddNoteDialog
          categoryId={category.id}
          onNoteCreated={handleNoteCreated}
          isNotesEmpty={isNotesEmpty}
        />
      </section>
    </div>
  );
}
