'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMe, logout } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AuthDialog } from './components/AuthDialog';


export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getMe()
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false));
  }, []);

 
const handleLogout = async () => {
  try {
    await logout();
    setIsLoggedIn(false);
    router.push('/');
  } catch (error) {
    alert((error as Error).message);
  }
};

  return (
    <div className='flex flex-col justify-center items-center min-h-screen text-center'>
      <div className='flex flex-col'>
        {isLoggedIn && (
          <Button
            onClick={handleLogout}
            className='absolute top-0 right-0 text-sm text-violet-400 self-end cursor-pointer hover:text-violet-600 shadow-none'
          >
            Log out
          </Button>
        )}

        <h1
          className={cn(
            'text-[48px] sm:text-[48px] lg:text-[56px] font-bold mb-6 sm:mb-8 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#700aff] via-pink-500 to-purple-700 animate-text',
            { 'mt-9': !isLoggedIn }
          )}
        >
          Welcome to Notes App
        </h1>

        <p className='text-[18px] sm:text-[20px] lg:text-[24px] text-[var(--foreground)]'>
          Your thoughts. Organized.
        </p>

        <Image
          src='/notes-diary.png'
          alt='Notes illustration'
          width={400}
          height={400}
          className='self-center mb-8'
        />
      </div>

      {isLoggedIn ? (
        <Button
          className='max-w-140 w-full h-12 self-center bg-indigo-300 hover:bg-indigo-400 text-white transition'
          onClick={() => router.push('/categories')}
        >
          Go to Notes
        </Button>
      ) : (
        <AuthDialog onAuthSuccess={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}
