'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AuthDialog } from './components/home/AuthDialog';
import { Header } from './components/home/Header';
import { useUserStore } from '@/lib/store/user-store';

export default function HomePage() {
  const router = useRouter();
  const user = useUserStore(state => state.user);
  const loading = useUserStore(state => state.loading);

  return (
    <div className='flex flex-col justify-center items-center min-h-screen text-center px-4'>
      <Header isHomePage={true} />

      <div className='flex flex-col'>
        <h1
          className={cn(
            'text-[48px] sm:text-[48px] lg:text-[56px] font-bold mb-6 sm:mb-8 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#700aff] via-pink-500 to-purple-700 animate-text',
            { 'mt-9': !user }
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
          priority
        />
      </div>

      {!loading && user ? (
        <Button
          className='max-w-140 w-full h-12 self-center bg-indigo-300 hover:bg-indigo-400 text-white transition'
          onClick={() => router.push('/categories')}
        >
          Go to Notes
        </Button>
      ) : (
        <AuthDialog />
      )}
    </div>
  );
}
