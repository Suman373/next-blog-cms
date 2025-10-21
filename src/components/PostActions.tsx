'use client';


import { trpc } from '@/lib/trpc/client';
import { useRouter } from 'next/navigation';
import { usePostStore } from '@/store/postStore';
import { Pencil, Trash2 } from 'lucide-react';

export default function PostActions({ postId, slug }: PostActionsProps) {
  const router = useRouter();
  const deletePost = usePostStore((state) => state.deletePost);
  const deletePostMutation = trpc.post.delete.useMutation({
    onSuccess: () => {
      deletePost(postId);
      router.push('/posts');
    }
  });

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate({ id: postId });
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => router.push(`/posts/${slug}/edit`)}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
        title="Edit"
      >
        <Pencil size={20} />
      </button>
      <button
        onClick={handleDelete}
        className="p-2 text-red-600 hover:bg-red-50 rounded"
        title="Delete"
        disabled={deletePostMutation.isPending}
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}