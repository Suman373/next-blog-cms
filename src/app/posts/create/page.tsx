"use client";

import MarkdownEditor from "@/components/MarkdownEditor";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import { usePostStore } from "@/store/postStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import slugify from 'slugify';

export default function CreatePostPage() {
    const router = useRouter();
    const { addPost } = usePostStore();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    // data from trpc 
    const { data: categories } = trpc.category.getAll.useQuery();
    const createPost = trpc.post.create.useMutation();
    const assignCategories = trpc.postCategory.assignCategories.useMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const slug = slugify(title, { lower: true, strict: true });
        try {
            const post = await createPost.mutateAsync({
                title, content, slug, published
            });
            if (selectedCategories.length > 0) {
                await assignCategories.mutateAsync({
                    postId: post.id,
                    categoryIds: selectedCategories
                });
            }
            addPost(post);
            router.push(`/posts/${slug}`);
        } catch (error) {
            console.log(`Error creating post : ${error}`);
        }
    };

    const toggleCategory = (categoryId: number) => {
        setSelectedCategories(prev => prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]);
    };

    return (
        <div className="container mx-auto p-8 max-w-4xl">
            <h1 className="text-2xl font-semibold mb-8">Create New Post</h1>
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
                    <label htmlFor="published">Publish immediately</label>
                </div>

                <Button
                    type="submit"
                    className=""
                    disabled={createPost.isPending}
                >
                    {createPost.isPending ? 'Creating...' : 'Create Post'}
                </Button>
            </form>
        </div>
    )
}