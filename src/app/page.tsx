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
      <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Test Post
      </button>
      <div className="mt-4">
        <h2>Posts: {posts?.length ?? 0}</h2>
        {posts?.map(post => (
          <div key={post.id} className="border p-4 mt-2">
            <h3>{post.title}</h3>
            <p>{post.slug}</p>
          </div>
        ))}
      </div>
    </div>
  );
}