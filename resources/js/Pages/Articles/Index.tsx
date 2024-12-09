import React from 'react';
import { Link, useForm } from '@inertiajs/react';

// Definisikan tipe untuk props
interface Article {
  id: number;
  title: string;
  description: string;
}

interface IndexProps {
  articles: Article[];
}

const Index: React.FC<IndexProps> = ({ articles }) => {
  // Loop through articles and create a delete handler for each one
  const { delete:deleteArticle } = useForm()
  const handleDelete = (articleId: number) => {
    if (confirm('Are you sure you want to delete this article?')) {
      // Use the useForm hook's delete method
      // const { delete: deleteArticle } = useForm();
      deleteArticle(`/articles/${articleId}`);
    }
  };

  return (
    <div>
      <h1>Articles</h1>
      <Link href="/articles/create" className="btn btn-primary">
        Create New Article
      </Link>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <Link href={`/articles/${article.id}/edit`}>Edit</Link>
            {/* Using a button with onClick handler */}
            <button
              onClick={() => handleDelete(article.id)}
              style={{ display: 'inline-block' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
