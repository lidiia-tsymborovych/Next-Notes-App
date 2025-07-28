'use client';

import { useRouter } from 'next/navigation';
import CategoryCard from './CategoryCard';
import { CategoryItem } from '../types/category';

type Props = {
  categories: CategoryItem[];
};

export default function CategoriesList({ categories }: Props) {
  const router = useRouter();
  const useCompactLayout = categories.length <= 2;

  return (
    <section>
      {useCompactLayout ? (
        <div className='flex justify-center'>
          <div className='max-w-sm w-full flex flex-col gap-4'>
            {categories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => router.push(`/categories/${category.id}`)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 auto-rows-fr'>
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => router.push(`/categories/${category.id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
