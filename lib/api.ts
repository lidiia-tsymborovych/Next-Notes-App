// lib/api.ts
import { CategoryItem, CategoryWithoutId } from '@/app/types/category';
import { Note } from '@prisma/client';

const BASE_URL = '/api';

//
// ─── AUTH ────────────────────────────────────────────────────────────────
//

export async function getMe() {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Not authenticated');

  return res.json();
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<void> {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error || 'Registration failed');
  }
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<void> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error || 'Login failed');
  }
}

export async function logout(): Promise<void> {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to logout');
}


//
// ─── CATEGORIES ──────────────────────────────────────────────────────────
//

export async function getAllCategories(): Promise<CategoryItem[]> {
  const res = await fetch(`${BASE_URL}/categories`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch categories');

  return res.json();
}

export async function createCategory(
  category: CategoryWithoutId
): Promise<void> {
  const res = await fetch(`${BASE_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(category),
  });

  if (!res.ok) throw new Error('Failed to create category');
}

export async function deleteCategory(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/categories/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to delete category');
}

export async function addCategories(
  categories: CategoryWithoutId[] | CategoryWithoutId
): Promise<void> {
  const payload = Array.isArray(categories) ? { categories } : categories;

  const res = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to add categories: ${errorText}`);
  }
}


//
// ─── NOTES ───────────────────────────────────────────────────────────────
//

export async function getAllNotes(): Promise<Note[]> {
  const res = await fetch(`${BASE_URL}/notes`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch notes');

  return res.json();
}

export async function createNote(note: {
  title: string;
  content: string;
  categoryId: number;
}): Promise<Note> {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(note),
  });

  if (!res.ok) throw new Error('Failed to create note');

  return res.json();
}

export async function deleteNote(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to delete note');
}

export async function updateNote(
  id: number,
  data: Partial<Pick<Note, 'title' | 'content'>>
): Promise<Note> {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update note');

  return res.json();
}
