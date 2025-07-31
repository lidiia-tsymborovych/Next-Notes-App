'use client';
import React, { useEffect, useState } from 'react';

const BUBBLE_COLORS = [
  'from-indigo-400/40 via-purple-400/30 to-pink-400/20',
  'from-purple-300/30 via-pink-400/20 to-indigo-400/10',
  'from-pink-400/40 via-indigo-400/30 to-purple-400/20',
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

type Bubble = {
  size: number;
  left: number;
  duration: number;
  delay: number;
  xMove: number;
  mobileSize: number;
};

export default function BubblesBackground() {
  const [bubbles, setBubbles] = useState<Bubble[] | null>(null);

  useEffect(() => {
    const generatedBubbles = Array.from({ length: 20 }).map(() => ({
      size: randomBetween(30, 100),
      left: randomBetween(0, 100),
      duration: randomBetween(12, 22),
      delay: randomBetween(0, 20),
      xMove: randomBetween(-20, 20),
      mobileSize: randomBetween(10, 40),
    }));
    setBubbles(generatedBubbles);
  }, []);

  if (!bubbles) return null; // чекаємо генерації

  return (
    <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
      {bubbles.map((bubble, i) => {
        const colorClass = BUBBLE_COLORS[i % BUBBLE_COLORS.length];
        const style: React.CSSProperties & { [key: string]: string } = {
          width: `${bubble.size}px`,
          height: `${bubble.size}px`,
          left: `${bubble.left}%`,
          animationDuration: `${bubble.duration}s`,
          animationDelay: `${bubble.delay}s`,
          translate: '0 0',
          '--x-move': `${bubble.xMove}px`,
          '--width-mobile': `${bubble.mobileSize}px`,
          '--height-mobile': `${bubble.mobileSize}px`,
        };

        return (
          <span
            key={i}
            className={`
              absolute bottom-[-120px] rounded-full
              bg-gradient-to-tr ${colorClass}
              opacity-60
              animate-bubble
              bubble-${i}
            `}
            style={style}
          />
        );
      })}

      <style jsx>{`
        @keyframes bubble {
          0% {
            transform: translateX(0) translateY(0) scale(1);
            opacity: 0;
            filter: drop-shadow(0 0 5px rgba(255 255 255 / 0.3));
          }
          10% {
            opacity: 0.5;
          }
          50% {
            transform: translateX(var(--x-move)) translateY(-400px) scale(1.1);
            opacity: 0.7;
            filter: drop-shadow(0 0 10px rgba(255 255 255 / 0.5));
          }
          80% {
            transform: translateX(calc(var(--x-move) / 2)) translateY(-600px)
              scale(0.9);
            opacity: 0.4;
          }
          100% {
            transform: translateX(0) translateY(-700px) scale(1);
            opacity: 0;
          }
        }

        .animate-bubble {
          animation-name: bubble;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        @media (max-width: 640px) {
          ${bubbles
            .map(
              (_, i) => `
            .bubble-${i} {
              width: var(--width-mobile);
              height: var(--height-mobile);
            }
          `
            )
            .join('\n')}
        }
      `}</style>
    </div>
  );
}
