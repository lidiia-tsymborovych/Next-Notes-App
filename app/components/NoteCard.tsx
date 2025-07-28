'use client';

import { useState } from 'react';
import { Note } from '../types/note';
import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react';

type Props = {
  note: Note;
  categoryId?: string;
  onEdit?: (note: Note) => void;
  onDelete?: (id: string) => void;
};

export default function NoteCard({
  note,
  categoryId,
  onEdit,
  onDelete,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(prev => !prev);

  return (
    <article
      className='border border-zinc-200 rounded-lg p-4 shadow-sm flex flex-col gap-2 transition-colors w-full'
      style={{
        backgroundColor: categoryId
          ? `var(--color-${categoryId}bg)`
          : 'var(--background)',
      }}
    >
      <div className='flex items-start gap-8 sm:gap-16 h-22'>
        <div onClick={toggleExpand} className='cursor-pointer flex-1'>
          <h2 className='font-semibold text-lg flex items-center gap-1'>
            {note.title}
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </h2>
          <p className='text-sm text-muted-foreground'>{note.date}</p>
          {!expanded && (
            <p className='text-sm text-gray-600 line-clamp-2 min-h-[2.5rem] mt-1'>
              {note.content}
            </p>
          )}
        </div>

        {/* RIGHT: Buttons */}
        <div className='flex flex-col sm:flex-row justify-around shrink-0 self-stretch sm:self-auto gap-2'>
          <button
            onClick={() => onEdit?.(note)}
            className='flex items-center justify-center sm:w-22 text-sm p-2 rounded-md border border-[var(--color-workicon)] text-[var(--color-workicon)] hover:bg-[var(--color-workicon)]/20 transition'
          >
            <span className='hidden sm:inline mr-2'>Edit</span>
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete?.(note.id)}
            className='flex items-center justify-center sm:w-22 text-sm p-2 rounded-md border border-[var(--color-hobbyicon)] text-[var(--color-hobbyicon)] hover:bg-[var(--color-hobbyicon)]/20 transition cursor-pointer'
            aria-label='Delete note'
          >
            <span className='hidden sm:inline mr-2'>Delete</span>

            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* FULL CONTENT */}
      {expanded && (
        <div className='text-sm text-gray-700 whitespace-pre-wrap'>
          {note.content}
        </div>
      )}
    </article>
  );
}
