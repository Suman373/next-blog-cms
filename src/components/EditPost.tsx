'use client';


import { trpc } from '@/lib/trpc/client';
import { usePostStore } from '@/store/postStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import slugify from 'slugify';
import { EditPostProps } from '@/types';

export default function EditPostForm({ post, assignedCategoryIds }: EditPostProps) {
  const router = useRouter();
  const updatePostInStore = usePostStore((state) => state.updatePost);
  
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [published, setPublished] = useState(post.published ?? false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(assignedCategoryIds);

  const { data: categories } = trpc.category.getAll.useQuery();
  const updatePost = trpc.post.update.useMutation();
  const assignCategories = trpc.postCategory.assignCategories.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSlug = slugify(title, { lower: true, strict: true });

    try {
      const updatedPost = await updatePost.mutateAsync({ 
        id: post.id, 
        title, 
        content, 
        slug: newSlug,
        published 
      });
      
      await assignCategories.mutateAsync({ 
        postId: post.id, 
        categoryIds: selectedCategories 
      });

      updatePostInStore(post.id, updatedPost);
      router.push(`/posts/${newSlug}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Edit Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Content (Markdown)</label>
          <MarkdownEditor value={content} onChange={setContent} />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Categories</label>
          <div className="flex gap-2 flex-wrap">
            {categories?.map(cat => (
              <label key={cat.id} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            id="published"
          />
          <label htmlFor="published">Published</label>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
            disabled={updatePost.isPending}
          >
            {updatePost.isPending ? 'Updating...' : 'Update Post'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-300 px-8 py-3 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}