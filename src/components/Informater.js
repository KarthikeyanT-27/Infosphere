import React, { useState } from 'react';
import axios from 'axios';

function InformatorPortal() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [place, setPlace] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/article/articles', { title, content,place,link });
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
        
        <input
          type="text"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          
        />
        <input
          type="text"
          placeholder="Place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          required
        />
        <button type="submit">Post Article</button>
      </form>
    </div>
  );
}

export default InformatorPortal;
