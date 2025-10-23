'use client';


import { trpc } from '@/lib/trpc/client';
import { usePostStore } from '@/store/postStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Post } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const { posts, setPosts, deletePost } = usePostStore();
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  
  const { data: postsData, isLoading } = trpc.post.getAll.useQuery();
  const deletePostMutation = trpc.post.delete.useMutation({
    onSuccess: (_, variables) => {
      deletePost(variables.id);
    }
  });

  useEffect(() => {
    if (postsData) {
      setPosts(postsData);
    }
  }, [postsData, setPosts]);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate({ id });
    }
  };

  const filteredPosts = posts.filter((post:Post) => {
    if (filter === 'published') return post.published;
    if (filter === 'draft') return !post.published;
    return true;
  });

  if (isLoading) return <div className="container mx-auto p-8">Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <Link href="/posts/create" className="bg-neutral-800 text-white px-6 py-2 rounded text-sm rounded-md">
          New Post
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2 border-b">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 ${filter === 'all' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-600'}`}
        >
          All ({posts.length})
        </button>
        <button
          onClick={() => setFilter('published')}
          className={`px-4 py-2 ${filter === 'published' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-600'}`}
        >
          Published ({posts.filter((p:Post) => p.published).length})
        </button>
        <button
          onClick={() => setFilter('draft')}
          className={`px-4 py-2 ${filter === 'draft' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-600'}`}
        >
          Drafts ({posts.filter((p:Post) => !p.published).length})
        </button>
      </div>

      {/* Posts Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Created</th>
              <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredPosts.map((post:Post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium">{post.title}</div>
                  <div className="text-sm text-gray-500">/{post.slug}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded ${post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(post.createdAt!).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => router.push(`/posts/${post.slug}`)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded inline-flex"
                    title="View"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => router.push(`/posts/${post.slug}/edit`)}
                    className="p-2 text-gray-600 hover:bg-blue-50 rounded inline-flex"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 text-gray-600 hover:bg-red-50 rounded inline-flex"
                    title="Delete"
                    disabled={deletePostMutation.isPending}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No posts found</p>
      )}
    </div>
  );
}