'use client';

import { useEffect, useState } from 'react';
import { CategoryItem } from '../types/category';
import { getAllCategories } from '@/lib/api';
import { NavigationActions } from '../components/NavigationActions';
import { CategoriesList } from '../components/CategoriesList';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[] | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  getAllCategories()
    .then(setCategories)
    .catch(() => setCategories([]))
    .finally(() => setLoading(false));
}, []);

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className='min-h-screen px-4 sm:px-8 flex flex-col gap-8 md:gap-10 lg:gap-12'>
      <NavigationActions />
      <h1 className='text-[32px] sm:text-[32px] md:text-[48px] lg:text-[56px] text-center text-[var(--foreground)] font-bold mt-16'>
        Your Categories
      </h1>

      <section className='flex-grow flex flex-col gap-16 max-w-6xl mx-auto w-full h-full '>
        <CategoriesList />
        {!categories?.length && (
          <div className='text-[var(--foreground)]/60 text-[16px] sm:text-[18px] text-center'>
            You have no categories yet.
          </div>
        )}
      </section>
    </div>
  );
}
