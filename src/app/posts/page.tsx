'use client';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc/client';
import { usePostStore } from '@/store/postStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PostsPage() {
  const { posts, setPosts, setLoading, isLoading } = usePostStore();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data: postsData, isLoading: fetchingPosts } = trpc.post.getAll.useQuery();
  const { data: categories } = trpc.category.getAll.useQuery();
  const { data: filteredPosts } = trpc.postCategory.getPostsByCategory.useQuery(
    { categoryId: selectedCategory! },
    { enabled: !!selectedCategory }
  );

  useEffect(() => {
    if (postsData) {
      setPosts(postsData);
    }
    setLoading(fetchingPosts);
  }, [postsData, fetchingPosts, setPosts, setLoading]);

  const displayPosts = selectedCategory
    ? filteredPosts
    : posts.filter(p => p.published);

  if (isLoading) return <div className="container mx-auto p-8">Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">All Blog Posts</h1>
        <Link href="/posts/create" className="bg-black text-sm text-white px-6 py-2 rounded-md">
          New Post
        </Link>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <Button
          variant={`${selectedCategory === null ? "default": "secondary"}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories?.map(cat => (
          <Button
            variant={`${selectedCategory === cat.id ? "default" : "secondary"}`}
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPosts?.map(post => (
          <Link key={post.id} href={`/posts/${post.slug}`}>
            <div className="border rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p>{post.content.substring(0,100)}</p>
              {/* <ReactMarkdown>{post.content.trim().substring(0,80)}</ReactMarkdown> */}
              <p className="text-sm text-gray-400 mt-4">
                {new Date(post.createdAt!).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {displayPosts?.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No posts found</p>
      )}
    </div>
  );
}