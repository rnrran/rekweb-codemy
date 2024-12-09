import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  category: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    name: string;
  };
}

interface ShowProps {
  article: Article;
}

const Show: React.FC<ShowProps> = ({ article }) => {
  const user = usePage().props.auth.user;

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-5xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          {article.category.name}
        </h2>
      }
    >
      <Head title={article.title} />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              <strong>Penulis:</strong> {article.user.name}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Kategori:</strong> {article.category.name}
            </p>
            <div className="prose dark:prose-dark">
              {article.content}
            </div>
            <div className="mt-6">
              <Link href={route('articles.index')} className="btn bg-gray-200  hover:bg-gray-400">
                Kembali ke Daftar Artikel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Show;
