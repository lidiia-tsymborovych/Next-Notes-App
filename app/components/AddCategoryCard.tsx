'use client';

import { useRouter } from 'next/navigation';

export default function AddCategoryCard() {
  const router = useRouter();

  return (
    <article
      onClick={() => router.push('/categories/select-template')}
      className='min-w-70 min-h-35 w-full cursor-pointer rounded-2xl border-2 border-[var(--input-ring)]/10 p-6 shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.01] flex flex-col justify-center items-center gap-2 opacity-80 hover:opacity-100 bg-white text-violet-500 hover:text-violet-600'
    >
      <span className='text-4xl'>＋</span>
      <p className='text-[16px]'>Add New Category</p>
    </article>
  );
}
