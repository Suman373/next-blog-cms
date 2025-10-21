"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import React, { useState } from "react"
import slugify from "slugify";

export default function CategoriesPage() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    const utils = trpc.useUtils();
    const { data: categories, isLoading } = trpc.category.getAll.useQuery();
    const createCategory = trpc.category.create.useMutation({
        onSuccess: () => {
            utils.category.getAll.invalidate();
            setName("");
            setDescription("");
        }
    });

    const updateCategory = trpc.category.update.useMutation({
        onSuccess: () => {
            utils.category.getAll.invalidate();
            setName("");
            setDescription("");
            setEditingId(null);
        }
    });

    const deleteCategory = trpc.category.delete.useMutation({
        onSuccess: () => utils.category.getAll.invalidate()
    });

    const resetForm = () => {
        setEditingId(null);
        setName('');
        setDescription('');
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const slug = slugify(name, { lower: true, strict: true });

        if (editingId) {
            updateCategory.mutate({ id: editingId, name, description, slug });
        } else {
            createCategory.mutate({ name, description, slug });
        }
    };

    const handleEdit = (cat: any) => {
        setEditingId(cat.id);
        setName(cat.name);
        setDescription(cat.description || "");
    };

    if (isLoading) return <div className="container mx-auto p-8">Loading...</div>;

    return (
        <div className="container mx-auto p-8 max-w-4xl">
            <h1 className="text-2xl font-semibold mb-8">Manage Categories</h1>

            <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 mb-8">
                <h2 className="text-xl font-medium mb-4">
                    {editingId ? 'Edit Category' : 'Add New Category'}
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block mb-2 font-semibold">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded px-4 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border rounded px-4 py-2"
                            rows={3}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            disabled={createCategory.isPending || updateCategory.isPending}
                        >
                            {editingId ? 'Update' : 'Create'}
                        </Button>
                        {editingId && (
                            <Button
                                type="button"
                                onClick={resetForm}>
                                Cancel
                            </Button>
                        )}
                    </div>
                </div>
            </form>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Slug</th>
                            <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {categories?.map(cat => (
                            <tr key={cat.id}>
                                <td className="px-6 py-4">{cat.name}</td>
                                <td className="px-6 py-4 text-gray-600">{cat.description || '-'}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{cat.slug}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button
                                        onClick={() => handleEdit(cat)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteCategory.mutate({ id: cat.id })}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}