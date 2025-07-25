'use client';
import React from 'react';
import { mockNotes } from '@/lib/mockNotes';

type Props = {
  params: Promise<{ id: string }>;
};

export default function NotePage({ params }: Props) {
  const actualParams = React.use(params);
  const note = mockNotes.find(n => n.id === actualParams.id);

  if (!note) {
    return <p className='text-red-500'>Note not found 😢</p>;
  }

  return (
    <main className='p-6'>
      <article className=''>
        <h1>{note.title}</h1>
        <p className=''>{note.date}</p>
        <hr />
        <p>{note.content}</p>
      </article>
    </main>
  );
}
