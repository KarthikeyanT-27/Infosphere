import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewerPortal() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            apiKey: '72ea8c0fabb84f018e44605aaf3e9ec8',
          },
        });
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: searchQuery,
          apiKey: '72ea8c0fabb84f018e44605aaf3e9ec8',
        },
      });
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error searching articles:', error);
    }
  };

  const handleBookmark = (article) => {
    setBookmarks([...bookmarks, article]);
  };

  return (
    <div>
      <h1>Viewer Portal</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search News"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <h2>Top Headlines</h2>
        {articles.map((article, index) => (
          <div key={index}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <button onClick={() => handleBookmark(article)}>Bookmark</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Bookmarks</h2>
        {bookmarks.map((bookmark, index) => (
          <div key={index}>
            <h3>{bookmark.title}</h3>
            <p>{bookmark.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewerPortal;
