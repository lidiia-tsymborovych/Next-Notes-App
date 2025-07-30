'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import AddNoteForm from './AddNoteForm';
import { Note } from '../types/note';
import { cn } from '@/lib/utils';
import { DialogDescription } from '@radix-ui/react-dialog';

type Props = {
  categoryId: number;
  onNoteCreated: (note: Note) => void;
  isNotesEmpty: boolean;
};

export default function AddNoteDialog({ categoryId, onNoteCreated, isNotesEmpty }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNoteCreated = (note: Note) => {
    onNoteCreated(note);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            'h-10 self-start px-6 mb-8 bg-indigo-300 hover:bg-indigo-400 text-white transition',
            { 'self-center w-60': isNotesEmpty }
          )}
        >
          + Add New Note
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-white border border-indigo-300'>
        <DialogDescription>
          This dialog allows you to create a note.
        </DialogDescription>
        <DialogHeader>
          <DialogTitle>New Note</DialogTitle>
        </DialogHeader>
        <AddNoteForm
          categoryId={categoryId}
          onNoteCreated={handleNoteCreated}
        />
      </DialogContent>
    </Dialog>
  );
}
