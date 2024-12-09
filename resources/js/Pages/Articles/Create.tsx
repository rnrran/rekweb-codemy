import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Swal from 'sweetalert2';

interface Category {
  id: number;
  name: string;
}

interface CreateProps {
  categories: Category[];
}

const Create: React.FC<CreateProps> = ({ categories }) => {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    content: '',
    category_id: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Submit artikel ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, publish !',
      cancelButtonText: 'Cancel',
    });
  
    // Jika pengguna mengonfirmasi, kirim data form
    if (result.isConfirmed) {
      post('/articles', {
        onSuccess: () => {
          Swal.fire('Created!', 'Artikel berhasil dibuat.', 'success');
        },
        onError: () => {
          Swal.fire('Error!', 'Ada masalah ketika membuat konten', 'error');
        },
      });
    }
  };
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Buat Materi Baru
        </h2>
      }
    >
      <Head title="Codemy - Tulis" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          <div className="bg-white p-6 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
            <h1 className="text-2xl font-semibold mb-6">Tulis Artikel Baru</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  required
                  placeholder="Masukan judul"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                />
                {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Content
                </label>
                <textarea
                  id="content"
                  value={data.content}
                  onChange={(e) => setData('content', e.target.value)}
                  required
                  placeholder="Masukan konten"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                />
                {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content}</p>}
              </div>

              <div>
                <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Category
                </label>
                <select
                  id="category_id"
                  value={data.category_id}
                  onChange={(e) => setData('category_id', e.target.value)}
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && <p className="mt-2 text-sm text-red-600">{errors.category_id}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  placeholder="Masukan deskripsi"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {processing ? 'Mengpublish...' : 'Publish'}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link href="/articles" className="text-indigo-600 hover:text-indigo-800">
                Kembali Ke List Artikel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Create;
