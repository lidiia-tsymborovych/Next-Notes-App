import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { CategoryName } from '@/app/types/category';
import { CategoryNotesClient } from '@/app/components/category/CategoryNotesClient';

type Props = {
  params: Promise<{ categoryId: string }>;
};

export default async function CategoryNotesPage({ params }: Props) {
  const { categoryId } = await params;
  const id = Number(categoryId);

  if (isNaN(id)) notFound();

  const category = await prisma.category.findUnique({
    where: { id },
    include: { notes: true },
  });

  if (!category) notFound();

  const typedCategory = {
    ...category,
    iconName: category.iconName as CategoryName,
  };

  return <CategoryNotesClient category={typedCategory} />;
}



