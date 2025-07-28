import { CategoryItem } from "@/app/types/category";
import { defaultCategories } from "./DefaultCategories";

export function getAvailableTemplates(
  userCategories: CategoryItem[],
): CategoryItem[] {
  const usedTitles = new Set(
    userCategories.map(cat => cat.title.toLowerCase())
  );

  return defaultCategories.filter(cat => !usedTitles.has(cat.title.toLowerCase()));
}
