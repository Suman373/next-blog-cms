'use client';
import { trpc } from '@/lib/trpc/client';

export default function Home() {
  const utils = trpc.useUtils();
  const { data: posts, isLoading } = trpc.post.getAll.useQuery();
  const createPost = trpc.post.create.useMutation({
    onSuccess: () => utils.post.getAll.invalidate(),
  });

  const handleCreate = () => {
    createPost.mutate({
      title: "Test Post",
      content: "This is a test",
      slug: "test-post-" + Date.now(),
      published: false,
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      Landing Page
    </div>
  );
}