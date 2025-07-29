'use client';

import { useRouter } from 'next/navigation';
import CategoryCard from './CategoryCard';
import { CategoryItem } from '../types/category';
import { deleteCategory, getAllCategories } from '@/lib/api';
import { useEffect, useState } from 'react';


export default function CategoriesList() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const router = useRouter();
  const useCompactLayout = categories.length <= 2;

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch(err => console.error('Failed to fetch categories', err));
  }, []);


  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (err) {
      console.error('Unable to delete', err);
      alert('Something went wrong try again later 🫠');
    }
  };

  const renderCard = (category: CategoryItem) => (
    <CategoryCard
      key={category.id}
      category={category}
      onClick={() => router.push(`/categories/${category.id}`)}
      onDelete={() => handleDelete(category.id)}
    />
  );

  return (
    <section>
      {useCompactLayout ? (
        <div className='flex justify-center'>
          <div className='max-w-sm w-full flex flex-col gap-4'>
            {categories.map(renderCard)}
          </div>
        </div>
      ) : (
        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 auto-rows-fr'>
          {categories.map(renderCard)}
        </div>
      )}
    </section>
  );
}
