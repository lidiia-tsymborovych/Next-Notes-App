'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Pencil, Trash2, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Note } from '@prisma/client';

type Props = {
  note: Note;
  onEdit?: (note: Note) => void;
  onDelete?: (id: number) => void;
};

export const NoteCard = ({ note, onEdit, onDelete }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: note.title,
    content: note.content,
  });

  const toggleExpand = () => {
    if (!isEditing) setExpanded(prev => !prev);
  };

  const isSaveDisabled =
    editedNote.title.trim() === '' || editedNote.content.trim() === '';


  const handleSave = () => {
    onEdit?.({
      ...note,
      title: editedNote.title,
      content: editedNote.content,
    });
    setIsEditing(false);
  };

  return (
    <article className='rounded-2xl p-5 w-full flex flex-col gap-4 bg-gray-50 border border-gray-200 shadow-md transition-shadow hover:shadow-lg min-h-26'>
      <div className='flex justify-between items-start gap-4 w-full'>
        <div onClick={toggleExpand} className='cursor-pointer flex-1'>
          {isEditing ? (
            <>
              <Input
                value={editedNote.title}
                onChange={e =>
                  setEditedNote({ ...editedNote, title: e.target.value })
                }
                className='text-xl font-semibold'
              />
              <Textarea
                value={editedNote.content}
                onChange={e =>
                  setEditedNote({ ...editedNote, content: e.target.value })
                }
                rows={4}
                className='mt-2'
              />
            </>
          ) : (
            <>
              <h2 className='font-semibold text-xl flex items-center gap-2 text-[var(--foreground)]'>
                {note.title}
                {expanded ? (
                  <ChevronUp size={18} className='text-gray-400' />
                ) : (
                  <ChevronDown size={18} className='text-gray-400' />
                )}
              </h2>
              {!expanded && (
                <p className='text-sm text-gray-600 line-clamp-2 mt-2'>
                  {note.content}
                </p>
              )}
            </>
          )}
        </div>

        <div className='flex flex-col sm:flex-row gap-2 shrink-0'>
          {isEditing ? (
            <Button
              size='sm'
              onClick={handleSave}
              disabled={isSaveDisabled}
              className='bg-green-100 hover:bg-green-200 text-green-800'
            >
              <Save size={16} />
              <span className='hidden sm:inline'>Save</span>
            </Button>
          ) : (
            <Button
              size='sm'
              variant='outline'
              className='border-none text-[var(--foreground)] bg-indigo-100 hover:bg-indigo-200'
              onClick={() => setIsEditing(true)}
            >
              <Pencil size={16} />
              <span className='hidden sm:inline'>Edit</span>
            </Button>
          )}

          <Button
            size='sm'
            variant='outline'
            className='border-none text-[var(--foreground)] bg-fuchsia-100 hover:bg-fuchsia-200'
            onClick={() => onDelete?.(note.id)}
          >
            <Trash2 size={16} />
            <span className='hidden sm:inline'>Delete</span>
          </Button>
        </div>
      </div>

      {!isEditing && expanded && (
        <div className='text-sm text-[var(--foreground)] whitespace-pre-wrap border-t pt-3 mt-2 border-gray-300'>
          {note.content}
        </div>
      )}
    </article>
  );
}
