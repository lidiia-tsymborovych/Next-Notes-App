'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GlobalNotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('stars') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
    }));

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'white';
    stars.forEach(({ x, y, r }) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }, []);

  return (
    <div className='relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center text-white text-center px-6'>
      <canvas
        id='stars'
        className='absolute inset-0 z-0 w-full h-full'
        style={{ pointerEvents: 'none' }}
      />

      <div className='z-10 space-y-6'>
        <h1
          className='relative text-[6rem] md:text-[10rem] font-extrabold tracking-widest text-transparent bg-clip-text animate-gradientGlow'
          style={{
            backgroundImage:
              'linear-gradient(270deg, #e0e0ff, #d29fff, #8b52b1, #d29fff, #e0e0ff)',
            backgroundSize: '600% 600%',
          }}
        >
          404
          {mounted && (
            <span
              aria-hidden='true'
              className='absolute top-0 left-0 w-full h-full text-transparent bg-clip-text'
              style={{
                backgroundImage:
                  'linear-gradient(270deg, #e0e0ff, #d29fff, #8b52b1, #d29fff, #e0e0ff)',
                backgroundSize: '600% 600%',
                filter: 'blur(8px)',
                opacity: 0.6,
                animation: 'gradientGlow 6s ease infinite',
                zIndex: -1,
                pointerEvents: 'none',
                transform: 'scale(1.1)',
              }}
            >
              404
            </span>
          )}
        </h1>

        <p className='text-[16px] md:text-[24px] text-white max-w-xl mx-auto leading-relaxed'>
          This page doesn&apos;t exist. Or maybe it slipped through a wormhole.
        </p>

        <button
          onClick={() => router.push('/')}
          className='mt-4 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-[16px] md:text-[20px] text-white font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg'
        >
          Go back home
        </button>
      </div>

      <style jsx>{`
        @keyframes gradientGlow {
          0% {
            background-position: 0% 50%;
            filter: brightness(1.1);
          }
          50% {
            background-position: 100% 50%;
            filter: brightness(1.3);
          }
          100% {
            background-position: 0% 50%;
            filter: brightness(1.1);
          }
        }
        .animate-gradientGlow {
          animation: gradientGlow 6s ease infinite;
        }
      `}</style>
    </div>
  );
}
