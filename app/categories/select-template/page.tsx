'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CategoryItem, CategoryWithoutId } from '@/app/types/category';
import { addCategories, getAllCategories } from '@/lib/api';
import { getAvailableTemplates } from '@/lib/getAvailableTemplates';
import { Button } from '@/components/ui/button';
import { CategoryItemCard } from '@/app/components/notes/ItemCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/app/components/home/Header';
import { CategoryForm } from '@/app/components/category/CategoryForm';

export default function SelectTemplatePage() {
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryWithoutId[]
  >([]);
  const [userCategories, setUserCategories] = useState<CategoryItem[] | null>(
    null
  );
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getAllCategories()
      .then(data => {
        setUserCategories(data);
        setLoading(false);
      })
      .catch(error => {
        alert((error as Error).message);
        setLoading(false);
      });
  }, []);

  const suggested = userCategories ? getAvailableTemplates(userCategories) : [];

  const isAnySelected = selectedCategories.length > 0;

  const toggleCategory = (cat: CategoryWithoutId) => {
    const exists = selectedCategories.find(c => c.title === cat.title);
    if (exists) {
      setSelectedCategories(prev => prev.filter(c => c.title !== cat.title));
    } else {
      setSelectedCategories(prev => [...prev, cat]);
    }
  };

  const handleAddCategories = async () => {
    if (selectedCategories.length === 0) return;

    try {
      const categoriesToAdd =
        selectedCategories.length === 1
          ? selectedCategories[0]
          : selectedCategories;

      await addCategories(categoriesToAdd);
      router.push('/categories');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className='min-h-screen px-4 sm:px-8 pt-20 flex flex-col gap-8 md:gap-10 lg:gap-12 mb-20'>
      <Header />
      <h1 className='text-[32px] sm:text-[32px] md:text-[48px] lg:text-[56px] text-center text-[var(--foreground)] font-bold'>
        Category Templates
      </h1>

      <div className='max-w-6xl mx-auto w-full'>
        {loading ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 w-full'>
            {[...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                className='h-28 rounded-lg bg-white border-3 border-[var(--input-border)]'
              />
            ))}
          </div>
        ) : (
          <>
            {!showCustomForm && (
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 w-full'>
                {suggested.map(cat => (
                  <CategoryItemCard
                    key={cat.title}
                    category={cat}
                    isSelected={selectedCategories.some(
                      c => c.title === cat.title
                    )}
                    onClick={() => toggleCategory(cat)}
                    isInteractive
                  />
                ))}

                {!selectedCategories.length && (
                  <button
                    onClick={() => setShowCustomForm(true)}
                    className='flex flex-col items-center justify-center min-h-28  rounded-lg cursor-pointer border-3 border-dashed border-gray-300 text-gray-300 hover:border-indigo-300 hover:text-indigo-400'
                    type='button'
                  >
                    + Create Custom Category
                  </button>
                )}
              </div>
            )}

            {showCustomForm && (
              <CategoryForm onClose={() => setShowCustomForm(false)} />
            )}

            {isAnySelected && (
              <div>
                <Button
                  onClick={handleAddCategories}
                  className='w-full h-12 self-center bg-indigo-300 hover:bg-indigo-400 text-white transition mb-16'
                >
                  Add categories
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
