'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Home } from 'lucide-react';
import { useUser } from '@/hooks/useUser';

export const NavigationActions = () => {
  const router = useRouter();
  const { user } = useUser();

  const btnClass =
    'flex items-center gap-1 py-2 text-sm text-[#8c92c1] hover:text-[#6a61d2] transition-colors';

  return (
    <div className='absolute top-2 left-4 right-4 z-50 flex justify-between items-start'>
      <div className='flex gap-3'>
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

      <p className='text-end text-[14px] text-[#8c92c1] py-2 leading-tight max-w-36'>
        Welcome {user?.name}!
      </p>
    </div>
  );
}
