// components/UserProvider.tsx (client)
'use client';

import { useUserStore } from '@/lib/store/user-store';
import { ReactNode, useEffect } from 'react';

export function UserProvider({ children }: { children: ReactNode }) {
  const fetchUser = useUserStore(state => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <>{children}</>;
}
