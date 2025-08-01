import { Skeleton } from '@/components/ui/skeleton';

export const CategoryCardSkeleton = () => {
  return (
    <article className='min-w-70 rounded-2xl border border-[var(--card-border)] p-6 shadow-sm flex flex-col justify-between gap-2 min-h-[140px] w-full bg-muted/50 animate-pulse'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex flex-col gap-2 w-full'>
          <Skeleton className='h-6 w-1/2' /> {/* Title */}
          <Skeleton className='h-4 w-1/3' /> {/* Notes count */}
        </div>
        <Skeleton className='h-10 w-10 rounded-full' /> {/* Icon bubble */}
      </div>
      <Skeleton className='h-4 w-20 mt-2' /> {/* Delete btn placeholder */}
    </article>
  );
};
