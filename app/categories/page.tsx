'use client';

import { useEffect, useState } from 'react';
import CategoriesList from '../components/CategoriesList';
import NavigationActions from '../components/NavigationActions';
import { useRouter } from 'next/navigation';
import { CategoryItem } from '../types/category';
import { Button } from '@/components/ui/button';
import { getAllCategories } from '@/lib/api';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

useEffect(() => {
  getAllCategories()
    .then(setCategories)
    .catch(() => setCategories([]))
    .finally(() => setLoading(false));
}, []);

  if (loading) return <p>Loading categories...</p>;

  return (
    <main className='flex flex-col items-stretch gap-6 sm:gap-16'>
      <div className='flex flex-col'>
        <NavigationActions />
        <h1 className='text-[24px] sm:text-[32px] md:text-[48px] lg:text-[56px] text-center text-[var(--foreground)] font-bold'>
          Your Categories
        </h1>
      </div>

      {categories && categories.length > 0 ? (
        <CategoriesList />
      ) : (
        <div className='self-center gap-4 text-[var(--foreground)]/60 text-lg sm:text-xl'>
          <p>You have no categories yet.</p>
        </div>
      )}

      <Button
        className='max-w-140 w-full h-10 self-center bg-indigo-300 hover:bg-indigo-400 text-white transition'
        onClick={() => router.push('/categories/select-template')}
      >
        + Add New Category
      </Button>
    </main>
  );
}
