'use client';

import { useEffect, useState } from 'react';
import { CategoryItem } from '../types/category';
import { deleteCategory, getAllCategories } from '@/lib/api';
import { CategoriesList } from '../components/category/CategoriesList';
import { Header } from '../components/home/Header';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className='min-h-screen px-4 pb-16 sm:px-8 flex flex-col gap-8 md:gap-10 lg:gap-12 pt-20'>
      <Header />
      <h1 className='text-[32px] sm:text-[32px] md:text-[48px] lg:text-[56px] text-center text-[var(--foreground)] font-bold'>
        Your Categories
      </h1>

      <section className='flex-grow flex flex-col gap-16 max-w-6xl mx-auto w-full h-full '>
        <CategoriesList
          categories={categories}
          loading={loading}
          onDelete={handleDelete}
        />
        {!categories?.length && !loading && (
          <div className='text-[var(--foreground)]/60 text-[16px] sm:text-[18px] text-center'>
            You have no categories yet.
          </div>
        )}
      </section>
    </div>
  );
}
