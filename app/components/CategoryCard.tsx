'use client';

import { Button } from '@/components/ui/button';
import { categoryIconMap, CategoryWithoutId } from '../types/category';
import { Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

type Props = {
  category: CategoryWithoutId;
  onClick?: () => void;
  onDelete?: () => void;
};

export default function CategoryCard({ category, onClick, onDelete }: Props) {
   const [isOpen, setIsOpen] = useState(false);
   const Icon = categoryIconMap[category.iconName];

   const handleDeleteConfirm = () => {
     if (onDelete) onDelete();
     setIsOpen(false);
   };

  return (
    <article
      onClick={onClick}
      className='cursor-pointer rounded-2xl border border-[var(--card-border)] p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.01] flex flex-col justify-between gap-2 min-h-[140px] w-full'
      style={{ backgroundColor: category.bgColor }}
    >
      <div className='flex items-start justify-between gap-4'>
        <div className='flex flex-col gap-1'>
          <h3 className='text-xl font-bold text-[var(--foreground)]'>
            {category.title}
          </h3>
          <p className='text-sm text-[var(--foreground)]'>
            {category.notes.length}{' '}
            {category.notes.length === 1 ? 'note' : 'notes'}
          </p>
        </div>

        <div className='p-2 rounded-full bg-white/40 backdrop-blur-sm shadow-md'>
          <Icon size={24} color={category.iconColor} />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={e => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className='!pl-0 self-start text-red-300 text-xs shadow-none hover:text-red-600 h-auto w-auto cursor-pointer'
          >
            <Trash2 className='p-0' />
            delete
          </Button>
        </DialogTrigger>

        <DialogContent className='max-w-sm bg-white rounded-2xl border-none p-8'>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete the category{' '}
              <strong>{category.title}</strong> and all its notes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className='flex gap-4'>
              <Button
                className='bg-indigo-100 h-12 grow'
                onClick={e => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className='bg-fuchsia-100 h-12 grow'
                onClick={e => {
                  e.stopPropagation();
                  handleDeleteConfirm();
                }}
              >
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </article>
  );
}
