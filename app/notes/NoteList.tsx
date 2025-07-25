'use client';

import { mockNotes } from '@/lib/mockNotes';
import Link from 'next/link';

export default function NoteList() {
  return (
    <div className='grid gap-4'>
      {mockNotes.map(note => (
        <div
          key={note.id}
          className='border rounded-lg p-4 flex flex-col gap-2'
        >
          <h2 className='text-lg font-semibold'>{note.title}</h2>
          <p className='text-sm text-muted-foreground'>{note.date}</p>
          <p className='text-sm line-clamp-3'>{note.preview}</p>

          <div className='mt-2'>
            <Link
              href={`/notes/${note.id}`}
              className='inline-block bg-[#8ecaff] py-2 px-4 rounded hover:bg-[#8ecaff]/80 transition'
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
