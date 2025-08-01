// store/userStore.ts
import { logout } from '@/lib/api';
import { User } from '@prisma/client';
import { create } from 'zustand';

interface UserStore {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserStore>(set => ({
  user: null,
  loading: true,
  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (!res.ok) throw new Error('Unauthorized');
      const data = await res.json();
      set({ user: data.user, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },
  logout: async () => {
    try {
      await logout();
      set({ user: null });
    } catch (e) {
      console.error(e);
    }
  },
}));
