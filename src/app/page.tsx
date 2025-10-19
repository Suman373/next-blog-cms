'use client';

import { trpc } from '@/lib/trpc/client';

export default function Home() {
  const { data, isLoading } = trpc.post.getAll.useQuery();
  
  if (isLoading) return <div>Loading...</div>;
  
  return <div>Posts: {data?.length ?? 0}</div>;
}