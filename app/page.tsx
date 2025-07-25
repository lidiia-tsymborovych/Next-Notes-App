'use client'

import Link from "next/link";

export default function Home() {
  return (
    <main className='p-6 text-center'>
      <h1 className='text-3xl font-bold mb-4'>Welcome to Notes App</h1>
      <p className='mb-6'>Your thoughts. Organized.</p>
      <Link
        href='/notes'
        className='inline-block bg-[#8ecaff] py-2 px-4 rounded hover:bg-[#8ecaff]/80 transition'
      >
        Go to Notes
      </Link>
    </main>
  );
}
