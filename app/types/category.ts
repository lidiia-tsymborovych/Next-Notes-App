import { Note } from '@prisma/client';
import {
  Briefcase,
  User,
  Heart,
  Home,
  BookOpen,
  ShoppingCart,
  Dumbbell,
  CircleDollarSign,
  AlarmClock,
  Star,
} from 'lucide-react';

export const categoryNames = [
  'work',
  'personal',
  'hobby',
  'home',
  'study',
  'shopping',
  'fitness',
  'finance',
  'urgent',
  'other',
] as const;

export type CategoryName = (typeof categoryNames)[number];

export function isCategoryName(value: string): value is CategoryName {
  return categoryNames.includes(value as CategoryName);
}

export const categoryIconMap: Record<
  CategoryName,
  React.ComponentType<{ size?: number; color?: string }>
> = {
  work: Briefcase,
  personal: User,
  hobby: Heart,
  home: Home,
  study: BookOpen,
  shopping: ShoppingCart,
  fitness: Dumbbell,
  finance: CircleDollarSign,
  urgent: AlarmClock,
  other: Star,
};

export interface CategoryItem {
  id: number;
  title: string;
  bgColor: string;
  iconColor: string;
  iconName: CategoryName;
  notes: Note[];
}

export type CategoryWithoutId = Omit<CategoryItem, 'id'>;

