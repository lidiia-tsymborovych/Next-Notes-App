'use client';

import { CategoryItem, categoryIconMap } from '../types/category';

type Props = {
  category: Omit<CategoryItem, 'id'>;
  onClick?: () => void;
};

export default function CategoryCard({ category, onClick }: Props) {
  const Icon = categoryIconMap[category.iconName];

  return (
    <article
      onClick={onClick}
      className='cursor-pointer rounded-2xl border border-[var(--card-border)] p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.01] flex flex-col justify-between min-h-[140px] w-full'
      style={{ backgroundColor: category.bgColor }}
    >
      <div className='flex items-start justify-between gap-4'>
        <div className='flex flex-col gap-1'>
          <h3 className='text-xl font-bold text-[var(--foreground)]'>
            {category.title}
          </h3>
          <p className='text-sm text-[var(--foreground)]'>
            {category.notes.length}{' '}
            {category.notes.length === 1 ? 'note' : 'notes'}
          </p>
        </div>
        <div className='p-2 rounded-full bg-white/60 backdrop-blur-sm shadow-sm'>
          <Icon
            size={24}
            color={category.iconColor}
          />
        </div>
      </div>
    </article>
  );
}
