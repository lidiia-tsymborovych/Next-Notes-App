'use client';

import { useRouter } from 'next/navigation';

export function NotFoundUI() {
  const router = useRouter();

  return (
    <div
      className='
        h-screen 
        bg-gradient-to-br 
        from-indigo-900 
        via-violet-900 
        to-fuchsia-900
        flex 
        flex-col 
        justify-center 
        items-center 
        gap-8 
        p-6 
        text-center 
        font-sans 
        select-none 
        text-white
      '
      style={{
        backgroundSize: '400% 400%',
        animation: 'gradientBackground 15s ease infinite',
      }}
    >
      <h1
        className='text-[9rem] font-extrabold tracking-widest drop-shadow-lg'
        style={{ textShadow: '0 0 12px rgba(255,255,255,0.8)' }}
      >
        404
      </h1>
      <p className='text-xl max-w-lg mx-auto leading-relaxed font-semibold drop-shadow-md text-pink-300'>
        Looks like you got lost in the violet haze. Don’t worry, the home portal
        awaits!
      </p>
      <button
        onClick={() => router.push('/')}
        className='
          mt-6 
          bg-gradient-to-r 
          from-fuchsia-500 
          via-pink-500 
          to-indigo-500
          px-8 
          py-4 
          rounded-xl 
          font-bold 
          shadow-lg
          hover:scale-105 
          hover:shadow-2xl 
          transition-transform 
          duration-300
        '
      >
        Take Me Home
      </button>

      <style jsx>{`
        @keyframes gradientBackground {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
