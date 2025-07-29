// import {
//   LucideIcon,
//   Briefcase,
//   Heart,
//   Star,
//   Home,
//   BookOpen,
//   ShoppingCart,
//   Dumbbell,
//   CircleDollarSign,
//   AlarmClock,
//   User,
// } from 'lucide-react';
// import { Note } from './note';

// export const CATEGORY_NAMES = [
//   'work',
//   'personal',
//   'hobby',
//   'home',
//   'study',
//   'shopping',
//   'fitness',
//   'finance',
//   'urgent',
//   'other',
// ] as const;

// export type Category = {
//   id: number;
//   name: CategoryName;
//   title: string;
//   bgColor: string;
//   iconColor: string;
//   notes: Note[];
// };

// export type CategoryName = (typeof CATEGORY_NAMES)[number];

// export const isCategoryName = (value: string): value is CategoryName => {
//   return CATEGORY_NAMES.includes(value as CategoryName);
// };

// export const categoryIconMap: Record<CategoryName, LucideIcon> = {
//   work: Briefcase,
//   personal: User,
//   hobby: Heart,
//   home: Home,
//   study: BookOpen,
//   shopping: ShoppingCart,
//   fitness: Dumbbell,
//   finance: CircleDollarSign,
//   urgent: AlarmClock,
//   other: Star,
// };

// export interface CategoryForm {
//   title: string;
//   bgColor: string;
//   iconColor: string;
//   notes: Note[];
// }

// export const defaultCategoryColors: Record<
//   CategoryName,
//   { bgColor: string; iconColor: string }
// > = {
//   work: { bgColor: '#E0E7FF', iconColor: '#4338CA' },
//   personal: { bgColor: '#DCFCE7', iconColor: '#166534' },
//   hobby: { bgColor: '#FFE4E6', iconColor: '#BE123C' },
//   home: { bgColor: '#FEF3C7', iconColor: '#78350F' },
//   study: { bgColor: '#E0F2FE', iconColor: '#0369A1' },
//   shopping: { bgColor: '#FFF7ED', iconColor: '#C2410C' },
//   fitness: { bgColor: '#ECFDF5', iconColor: '#15803D' },
//   finance: { bgColor: '#EFF6FF', iconColor: '#1D4ED8' },
//   urgent: { bgColor: '#FEE2E2', iconColor: '#B91C1C' },
//   other: { bgColor: '#F5F3FF', iconColor: '#7C3AED' },
// };

// export type DefaultCategory = {
//   title: CategoryName;
//   bgColor: string;
//   iconColor: string;
//   Icon: LucideIcon;
// };

// export const defaultCategories: DefaultCategory[] = (
//   Object.keys(defaultCategoryColors) as CategoryName[]
// ).map(title => ({
//   title,
//   bgColor: defaultCategoryColors[title].bgColor,
//   iconColor: defaultCategoryColors[title].iconColor,
//   Icon: categoryIconMap[title],
// }));

// export type Category = {
//   id: number;
//   name: CategoryName;
//   title: string;
//   bgColor: string;
//   iconColor: string;
//   notes: Note[];
// };

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

