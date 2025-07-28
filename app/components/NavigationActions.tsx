'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Home } from 'lucide-react';

export default function NavigationActions() {
  const router = useRouter();

  const btnClass =
    'flex items-center gap-1 p-2 text-sm text-[#8c92c1] hover:text-[#6a61d2] transition-colors';

  return (
    <div className='top-4 left-4 sm:top-8 sm:left-8 z-50 flex gap-1'>
      <button
        onClick={() => router.back()}
        className={btnClass}
        aria-label='Go back'
      >
        <ArrowLeft className='w-4 h-4' />
        Back
      </button>

      <button
        onClick={() => router.push('/')}
        className={btnClass}
        aria-label='Go home'
      >
        <Home className='w-4 h-4' />
        Home
      </button>
    </div>
  );
}
