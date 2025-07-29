'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { categoryIconMap, CategoryWithoutId } from '../types/category';
import { X } from 'lucide-react';
import CategoryPreview from './CategoryPreview';
import { useRouter } from 'next/navigation';
import { createCategory } from '@/lib/api';

const iconNames = Object.keys(
  categoryIconMap
) as (keyof typeof categoryIconMap)[];

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  icon: z.enum(iconNames),
  iconColor: z.string().regex(/^#([0-9A-Fa-f]{3}){1,2}$/, 'Invalid color'),
  backgroundColor: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, 'Invalid color'),
});

type CategoryFormValues = z.infer<typeof formSchema>;

type Props = {
  onClose: () => void;
};

export function CategoryForm({ onClose }: Props) {
  const router = useRouter();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      icon: 'work', // або перший елемент з iconNames
      iconColor: '#000000',
      backgroundColor: '#ffffff',
    },
  });

  const onSubmit = async (values: CategoryFormValues) => {
    const newCategory: CategoryWithoutId = {
      title: values.title,
      iconName: values.icon,
      iconColor: values.iconColor,
      bgColor: values.backgroundColor,
      notes: [],
    };

    try {
      await createCategory(newCategory);
      router.push('/categories');
    } catch (e) {
      alert((e as Error).message);
    }
  };


  const watchValues = form.watch();

  const previewCategory: CategoryWithoutId = {
    title: watchValues.title || 'Untitled',
    iconName: watchValues.icon || 'work',
    iconColor: watchValues.iconColor || '#000000',
    bgColor: watchValues.backgroundColor || '#ffffff',
    notes: [],
  };

  return (
    <div className='max-w-5xl relative'>
      <Button onClick={onClose}>
        <X size={16} />
      </Button>

      <div className='flex flex-col sm:flex-row justify-center gap-8 sm:gap-16'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 flex-1'
          >
            {/* Title */}
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. Work' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Icon */}
            <FormField
              control={form.control}
              name='icon'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select an icon' />
                      </SelectTrigger>
                      <SelectContent>
                        {iconNames.map(name => {
                          const Icon = categoryIconMap[name];
                          return (
                            <SelectItem key={name} value={name}>
                              <div className='flex items-center gap-2'>
                                <Icon size={16} />
                                <span className='capitalize'>{name}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-between'>
              {/* Icon color */}
              <FormField
                control={form.control}
                name='iconColor'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon Color</FormLabel>
                    <FormControl>
                      <Input type='color' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Background color */}
              <FormField
                control={form.control}
                name='backgroundColor'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background Color</FormLabel>
                    <FormControl>
                      <Input type='color' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type='submit'
              className='w-full h-10 self-center bg-indigo-300 hover:bg-indigo-400 text-white transition'
              disabled={!form.formState.isValid}
            >
              Create category
            </Button>
          </form>
        </Form>

        <div className='pt-4 flex-1'>
          <p className='text-sm text-muted-foreground mb-2'>Preview:</p>
          <CategoryPreview category={previewCategory} />
        </div>
      </div>
    </div>
  );
}
