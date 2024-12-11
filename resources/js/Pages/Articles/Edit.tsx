import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Swal from 'sweetalert2';


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
  const { data, setData, put, processing, errors } = useForm({
    title: article.title,
    content: article.content,
    category_id: article.category_id.toString(),
    description: article.description,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'Yakin Mengubah Artikel ?',
      text: "Artikel akan berubah dan tidak bisa direvert !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, ubah!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      put(`/articles/${article.id}`, {
        onSuccess: () => {
          Swal.fire('Terupdate!', 'Artikel berhasil diupdate.', 'success');
        },
        onError: (errors) => {
          Swal.fire('Error!', 'Ada masalah mengupdate artikel.', 'error');
          console.error('Error updating article', errors);
        }
      });
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit Artikel
        </h2>
      }
    >
      <Head title="Codemy - Edit Artikel" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          <div className="bg-white p-6 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
            <h1 className="text-2xl font-semibold mb-6">Edit Artikel</h1>
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

              {/* Content Field */}
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

              {/* Category Field */}
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

              {/* Description Field (Optional) */}
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

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {processing ? 'Updating...' : 'Update Artikel'}
                </button>
              </div>
            </form>

            {/* Link to articles list */}
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

export default Edit;
