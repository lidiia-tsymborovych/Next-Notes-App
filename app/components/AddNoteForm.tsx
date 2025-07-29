'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createNote } from '@/lib/api';
import { Note } from '../types/note';

type Props = {
  categoryId: number;
  onNoteCreated: (note: Note) => void;
};

export default function AddNoteForm({ categoryId, onNoteCreated }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const newNote = await createNote({
        title,
        content,
        categoryId,
      });
      onNoteCreated(newNote);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Failed to create note:', error);
      // Тут можна додати toast або індикатор помилки
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='Title'
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={loading}
      />
      <Textarea
        placeholder='Content'
        rows={4}
        value={content}
        onChange={e => setContent(e.target.value)}
        disabled={loading}
        className='mt-2'
      />
      <Button
        onClick={handleSubmit}
        disabled={loading || !title.trim() || !content.trim()}
        className='max-w-140 w-full h-10 self-center bg-indigo-300 hover:bg-indigo-400 text-white transition cursor-pointer'
      >
        Add Note
      </Button>
    </div>
  );
}
