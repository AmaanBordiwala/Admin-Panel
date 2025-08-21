'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FullScreenLoader from '@/components/FullScreenLoader';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard');
    } else if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  // Show loading while session is being fetched
  if (status === 'loading') {
    return (
     <FullScreenLoader/>
    );
  }
}
