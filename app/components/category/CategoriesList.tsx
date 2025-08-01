'use client';

import { useRouter } from 'next/navigation';
import { CategoryItem } from '../../types/category';
import { AddCategoryCard } from './AddCategoryCard';
import { CategoryCardSkeleton } from './CategoryCardSkeleton';
import { CategoryCard } from './CategoryCard';

type Props = {
  categories: CategoryItem[] | null;
  loading: boolean;
  onDelete: (id: number) => void;
};

export const CategoriesList = ({ categories, loading, onDelete }: Props) => {
  const router = useRouter();

  const renderCard = (category: CategoryItem) => (
    <CategoryCard
      key={category.id}
      category={category}
      onClick={() => router.push(`/categories/${category.id}`)}
      onDelete={() => onDelete(category.id)}
    />
  );

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr w-full'>
      {loading ? (
        [...Array(6)].map((_, i) => <CategoryCardSkeleton key={i} />)
      ) : (
        <>
          {categories?.map(renderCard)}
          <AddCategoryCard />
        </>
      )}
    </div>
  );
};
