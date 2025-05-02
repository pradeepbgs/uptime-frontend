'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { backend_url } from '@/service/api';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${backend_url}/api/v1/auth/check`, {
          withCredentials: true,
        });
      } catch (err) {
        router.push('/');
      }
    };

    checkAuth();
  }, [pathname]);

  return <>{children}</>;
}
