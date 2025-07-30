'use client';

import { useRouter } from 'next/navigation';
import CategoryCard from './CategoryCard';
import { CategoryItem } from '../types/category';
import { deleteCategory, getAllCategories } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import AddCategoryCard from './AddCategoryCard';

export default function CategoriesList() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const router = useRouter();

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
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr w-full'>
      {categories.map(renderCard)}
      <AddCategoryCard />
    </div>
  );
}
