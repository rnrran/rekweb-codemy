import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';

interface Category {
  id: number;
  name: string;
}

interface CreateProps {
  categories: Category[];
}

const Create: React.FC<CreateProps> = ({ categories }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [description, setDescription] = useState('');

  // Gunakan useForm untuk menangani form submission
  const { data, setData, post, processing, errors } = useForm({
    title,
    content,
    category_id,
    description,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/articles'); 
  };

  return (
    <div>
      <h1>Create New Article</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)} // Update state data via setData
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
            {processing ? 'Creating...' : 'Create Article'}
          </button>
        </div>
      </form>
      <Link href="/articles">Back to Articles List</Link>
    </div>
  );
};

export default Create;
