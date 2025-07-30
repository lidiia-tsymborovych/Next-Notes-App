'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { getAvailableTemplates } from '@/lib/getAvailableTemplates';
import { CategoryItem, CategoryWithoutId } from '@/app/types/category';
import NavigationActions from '@/app/components/NavigationActions';
import CategoryItemCard from '@/app/components/CategoryPreview';
import { CategoryForm } from '@/app/components/CaregoryForm';

export default function SelectTemplatePage() {
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryWithoutId[]
  >([]);
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
    <main className='min-h-screen px-4 sm:px-8 flex flex-col gap-8 md:gap-10 lg:gap-12'>
      <NavigationActions />
      <h1 className='text-[32px] sm:text-[32px] md:text-[48px] lg:text-[56px] text-center text-[var(--foreground)] font-bold mt-16'>
        Category Templates
      </h1>
      <div className='max-w-6xl mx-auto w-full'>
        {!showCustomForm && (
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 w-full'>
            {suggested.map(cat => (
              <CategoryItemCard
                key={cat.title}
                category={cat}
                isSelected={selectedCategories.some(c => c.title === cat.title)}
                onClick={() => toggleCategory(cat)}
                isInteractive
              />
            ))}

            {!showCustomForm && !selectedCategories.length && (
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
              className='w-full h-12 self-center bg-indigo-300 hover:bg-indigo-400 text-white transition'
            >
              Add categories
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
