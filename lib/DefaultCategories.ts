import { CategoryItem } from "@/app/types/category";

export const defaultCategories: Omit<CategoryItem, 'id'>[] = [
  {
    title: 'work',
    bgColor: '#E0E7FF', // light indigo
    iconColor: '#4338CA', // indigo-700
    iconName: 'work',
    notes: [],
  },
  {
    title: 'personal',
    bgColor: '#DCFCE7', // light green
    iconColor: '#166534', // green-800
    iconName: 'personal',
    notes: [],
  },
  {
    title: 'hobby',
    bgColor: '#FFE4E6', // light rose
    iconColor: '#BE123C', // rose-800
    iconName: 'hobby',
    notes: [],
  },
  {
    title: 'home',
    bgColor: '#FEF3C7', // light amber
    iconColor: '#78350F', // amber-900
    iconName: 'home',
    notes: [],
  },
  {
    title: 'study',
    bgColor: '#E0F2FE', // light sky
    iconColor: '#0369A1', // sky-700
    iconName: 'study',
    notes: [],
  },
  {
    title: 'shopping',
    bgColor: '#FFF7ED', // light orange
    iconColor: '#C2410C', // orange-700
    iconName: 'shopping',
    notes: [],
  },
  {
    title: 'fitness',
    bgColor: '#ECFDF5', // light emerald
    iconColor: '#15803D', // emerald-700
    iconName: 'fitness',
    notes: [],
  },
  {
    title: 'finance',
    bgColor: '#EFF6FF', // light blue
    iconColor: '#1D4ED8', // blue-700
    iconName: 'finance',
    notes: [],
  },
  {
    title: 'urgent',
    bgColor: '#FEE2E2', // light red
    iconColor: '#B91C1C', // red-700
    iconName: 'urgent',
    notes: [],
  },
  {
    title: 'other',
    bgColor: '#F5F3FF', // light violet
    iconColor: '#7C3AED', // violet-700
    iconName: 'other',
    notes: [],
  },
];
