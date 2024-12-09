import React, { useState } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface Category {
  id: number;
  name: string;
}

interface EditProps {
  article: {
    id: number;
    title: string;
    content: string;
    description: string;
    category_id: number;
  };
  categories: Category[];
}

const Edit: React.FC<EditProps> = ({ article, categories }) => {
  // Inertia useForm hook untuk menangani form
  const { data, setData, post, processing, errors, put } = useForm({
    title: article.title,
    content: article.content,
    category_id: article.category_id.toString(),
    description: article.description,
  });

  // Handle submit ketika form disubmit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mengirimkan data ke backend menggunakan POST
    put(`/articles/${article.id}`, {
      onSuccess: () => {
        console.log('Article updated successfully');
      },
      onError: (errors) => {
        console.error('Error updating article', errors);
      }
    });
  };

  return (
    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Edit Artikel
            </h2>
        }
    >
    <Head title="Profile" />
    <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                <h1>Edit Article</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        required
                        placeholder="Enter article title"
                    />
                    {errors.title && <div>{errors.title}</div>}
                    </div>
                    <div>
                    <label>Content</label>
                    <textarea
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        required
                        placeholder="Enter article content"
                    />
                    {errors.content && <div>{errors.content}</div>}
                    </div>
                    <div>
                    <label>Category</label>
                    <select
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                        ))}
                    </select>
                    {errors.category_id && <div>{errors.category_id}</div>}
                    </div>
                    <div>
                    <label>Description (Optional)</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Enter article description"
                    />
                    </div>
                    <div>
                    <button type="submit" disabled={processing}>
                        {processing ? 'Updating...' : 'Update artikel'}
                    </button>
                    </div>
                </form>
                <Link href="/articles">Back to Articles List</Link>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
