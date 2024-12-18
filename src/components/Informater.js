import React, { useState } from 'react';
import axios from 'axios';

function InformatorPortal() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/articles', { title, content });
      alert('Article posted successfully');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error posting article:', error);
      alert('Error posting article');
    }
  };

  return (
    <div>
      <h1>Informator Portal</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Post Article</button>
      </form>
    </div>
  );
}

export default InformatorPortal;
