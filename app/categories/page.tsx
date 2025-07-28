'use client';

import { useEffect, useState } from 'react';
import CategoriesList from '../components/CategoriesList';
import NavigationActions from '../components/NavigationActions';
import { useRouter } from 'next/navigation';
import { CategoryItem } from '../types/category';
import { Button } from '@/components/ui/button';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories', { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data);
      } catch {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;

  return (
    <main className='flex flex-col items-stretch gap-6 sm:gap-16 min-h-screen relative'>
      <div className='flex flex-col'>
        <NavigationActions />
        <h1 className='text-[24px] sm:text-[32px] md:text-[48px] lg:text-[56px] text-center text-[var(--foreground)] font-bold'>
          Your Categories
        </h1>
      </div>

      {categories && categories.length > 0 ? (
        <CategoriesList categories={categories} />
      ) : (
        <div className='flex flex-col items-center mt-20 gap-4'>
          <p>You have no categories yet.</p>
        </div>
      )}

      {/* <button
        onClick={() => router.push('/categories/select-template')}
        className='bg-indigo-300 hover:bg-indigo-400 text-white px-6 py-2 rounded-lg shadow-md transition'
      >
        Add Category
      </button> */}

      <Button
        className='max-w-140 w-full h-10 self-center bg-indigo-300 hover:bg-indigo-400 text-white transition'
        onClick={() => router.push('/categories/select-template')}
      >
        Add Category
      </Button>
    </main>
  );
}
