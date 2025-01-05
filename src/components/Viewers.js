import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./viewers.css";

function App() {
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState(''); 
    const [news, setNews] = useState([]); 
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    useEffect(() => {
        document.body.classList.add('light-mode'); // Set light mode by default

        return () => {
            document.body.classList.remove('light-mode');
            document.body.classList.remove('dark-mode');
        };
    }, []);
    
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`https://api.currentsapi.services/v1/latest-news`,{
                   params:{
                       apiKey:'cWugUa8IPyY8k3IGnsSSYjneniNQAbo8P7871UkZbFyhFXm9',
                       language:'en',
                       country:'IN',
                   },
                }); 
                
                setNews(response.data.news); 
               } catch (error) {
                    console.error({ error: 'Failed to fetch news' });
        }
    };
    fetchNews();
    },[]);
    
    useEffect(() => {
        const fetchNews = async () => { 
            const response = await axios.get('http://localhost:5000/api/article/news', { 
            params: { category } 
        }); 
        setArticles(response.data); 
    }; fetchNews(); 
    }, [category]);

    useEffect(() => {
        const fetchApprovedArticles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/article/articles');
                setArticles(response.data);
            } catch (error) {
                console.error('Error fetching articles', error);
            }
        };
        fetchApprovedArticles();
    }, []);

    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
        document.body.classList.toggle('light-mode', isDarkMode);
    };

    const categories = ['general', 'Technology', 'Education', 'Business','Health','sports','entertainment','lifestyle','environment','science','world news'];

    return (
        <div>
          <button className="mode-toggle" onClick={toggleMode}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <div className="category-buttons">
              {categories.map(cat => (
                  <button
                      key={cat}
                      className="category-button"
                      onClick={() => setCategory(cat === 'All' ? '' : cat.toLowerCase())}
                  >
                      {cat}
                  </button>
              ))}
          </div> 

          <h2>News from Infosphere</h2>
          <div className="container"> 
          {articles.map((item) => (
            <div key={item._id} className="news-box"> 
            <div className="news-category">{item.category}</div>
            <h2>{item.title}</h2> 
            <p>{item.content}</p>
            <a className='anchor' href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
            <small >Posted on: {new Date(item.date).toLocaleDateString()}</small>
             </div> ))} 
          </div>
          <h1>Latest News</h1>
          <div className="container"> 
          {news.map((article, index) => ( 
            <div key={index} className="news-box"> 
                <div className="news-category">{article.category}</div>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a> 
            </div> ))}
          </div>
        </div>
    );
}

export default App;
