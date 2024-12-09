import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface Article {
  id: number;
  title: string;
  description: string;
  created_at: string; 
}

interface IndexProps {
  articles: Article[];
}

const Index: React.FC<IndexProps> = ({ articles }) => {
  const [expandedArticles, setExpandedArticles] = useState<number[]>([]);

  const user = usePage().props.auth.user;
  const { delete: deleteArticle } = useForm();
  const handleDelete = (articleId: number) => {
    if (confirm('Are you sure you want to delete this article?')) {
      deleteArticle(`/articles/${articleId}`);
    }
  };

  console.log("user:", articles);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Selamat Datang, {user.name} !
        </h2>
      }
    >
      <Head title="Codemy - Homes" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 text-9xl 
              text-center py-20 flex justify-center">

            <img src="/images/belajar.gif" alt="belajar" style={{ width: '80%', height: 'auto' }} className=''/>
          </div>
          <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 ">
            <div className='flex flex-row justify-between'>
              <h1 className='text-7xl font-bold font-sans mb-10 '>📚 Yuk Belajar !</h1>
              <Link href="/articles/create" className="btn btn-xs">
                Tulis Materi
              </Link>
            </div>
            <ul className='overflow-y-auto max-h-96 bg-white rounded text-center border-2'>
              {articles.map((article) => {
                const isExpanded = expandedArticles.includes(article.id);
                const truncatedDescription = article.description.length > 100
                  ? `${article.description.substring(0, 100)}...`
                  : article.description;

                // Format tanggal penulisan
                const formattedDate = new Date(article.created_at).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });

                return (
                  <li key={article.id} className='border-b-2 my-4 py-4 pb-4'>
                    <h3 className='text-4xl font-sans font-semibold'>{article.title}</h3>
                    <p className='font-sans font-light'>
                      {isExpanded ? article.description : truncatedDescription}
                    </p>
                    <p className='text-gray-500 text-sm'>
                      Ditulis pada: {formattedDate}
                    </p>
                    {article.description.length > 100 && (
                      <Link
                        // onClick={() => toggleReadMore(article.id)}
                        className='btn btn-xs btn-link'
                        href={`/articles/${article.id}`}
                      >
                        {isExpanded ? 'Read Less' : 'Read More'}
                      </Link>
                    )}
                    <div className="mt-2">
                      <Link href={`/articles/${article.id}/edit`} className='btn btn-xs mr-2'>
                        Edit
                      </Link>
                      {/* Tombol Delete */}
                      <button
                        onClick={() => handleDelete(article.id)}
                        className='btn btn-xs btn-error'
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;