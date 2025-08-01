'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { deleteCategory } from '@/lib/api'; // Приклад: твій API для видалення
import { CategoryItem } from '@/app/types/category';
import { CategoryCardSkeleton } from './CategoryCardSkeleton';
import { CategoryCard } from './CategoryCard';
import { AddCategoryCard } from './AddCategoryCard';

type Props = {
  initialCategories: CategoryItem[];
};

export const CategoriesTemplate = ({ initialCategories }: Props) => {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    setLoading(true);
    try {
      await deleteCategory(id); // Виклик API для видалення
      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr w-full'>
        {[...Array(6)].map((_, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr w-full'>
      {categories.map(category => (
        <CategoryCard
          key={category.id}
          category={category}
          onClick={() => router.push(`/categories/${category.id}`)}
          onDelete={() => handleDelete(category.id)}
        />
      ))}
      <AddCategoryCard />
    </div>
  );
};
