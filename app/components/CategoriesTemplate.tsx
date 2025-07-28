'use client';
import { useEffect, useState } from 'react';
import {CategoryItem } from '../types/category';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { getAvailableTemplates } from '@/lib/getAvailableTemplates';
import { CategoryForm } from './CaregoryForm';
import CategoryItemCard from './CategoryPreview';

export default function CategoriesTemplate() {
  const [selectedCategories, setSelectedCategories] = useState<CategoryItem[]>([]);
  const [userCategories, setUserCategories] = useState<CategoryItem[]>([]);
    const [showCustomForm, setShowCustomForm] = useState(false);


  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setUserCategories(data);
    };
    fetchCategories();
  }, []);


  const suggested = getAvailableTemplates(userCategories);


  const router = useRouter();

  const isAnySelected = selectedCategories.length > 0;

  // Тогл категорії у швидкому режимі
  const toggleCategory = (cat: CategoryItem) => {
    const exists = selectedCategories.find(c => c.title === cat.title);
    if (exists) {
      setSelectedCategories(prev => prev.filter(c => c.title !== cat.title));
    } else {
      setSelectedCategories(prev => [...prev, cat]);
    }
  };

const handleAddCategories = async () => {
  if (selectedCategories.length === 0) return;

  const payload =
    selectedCategories.length === 1
      ? selectedCategories[0]
      : { categories: selectedCategories };

  try {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Failed to add categories');

    // редірект на сторінку категорій після успіху
    router.push('/categories');
  } catch (e) {
    alert((e as Error).message);
  }
};


  return (
    <main className='max-w-5xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-center'>
        Categories Template
      </h1>

      {!showCustomForm && (
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6'>
          {suggested.map(cat => (
            <CategoryItemCard
              key={cat.title}
              category={cat}
              isSelected={selectedCategories.some(c => c.title === cat.title)}
              onClick={() => toggleCategory(cat)}
              isInteractive
            />
          ))}
        </div>
      )}

      {showCustomForm ? (
        <CategoryForm onClose={() => setShowCustomForm(false)} />
      ) : (
        <button
          onClick={() => setShowCustomForm(true)}
          className='flex flex-col items-center justify-center gap-2 p-4 rounded-lg cursor-pointer border-4 border-dashed border-gray-400 text-gray-600 hover:border-indigo-300 hover:text-indigo-400'
          type='button'
        >
          + Create Custom Category
        </button>
      )}

      {isAnySelected && (
        <div>
          <Button
            onClick={handleAddCategories}
            className='w-full h-10 self-center bg-indigo-300 hover:bg-indigo-400 text-white transition'
          >
            Add categories
          </Button>
        </div>
      )}
    </main>
  );
}
