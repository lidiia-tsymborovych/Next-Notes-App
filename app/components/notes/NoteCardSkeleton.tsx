import { Skeleton } from '@/components/ui/skeleton';

export const NoteCardSkeleton = () => {
  return (
    <article className='rounded-2xl p-5 w-full flex flex-col gap-4 bg-gray-50 border border-gray-200 shadow-md h-26'>
      <div className='flex justify-between items-start gap-4 w-full'>
        <div className='flex-1 flex flex-col gap-2'>
          <Skeleton className='h-6 w-1/3 rounded-md' />
          <Skeleton className='h-4 w-full rounded-md' />

          <Skeleton className='h-4 w-full rounded-md' />
        </div>

        <div className='flex flex-col sm:flex-row gap-2 shrink-0'>
          <Skeleton className='h-8 w-20 rounded-md' />
          <Skeleton className='h-8 w-20 rounded-md' />
        </div>
      </div>
      <Skeleton className='h-16 w-full rounded-md mt-2' />
    </article>
  );
};
