import React from 'react';
import { Link } from '@inertiajs/react';

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
            <form method="POST" action={`/articles/${article.id}`} style={{ display: 'inline-block' }}>
              <input type="hidden" name="_method" value="DELETE" />
              <button type="submit">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
