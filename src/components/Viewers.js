import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [articles, setArticles] = useState([]);

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

    return (
        <div>
            <h1>News Viewer Portal</h1>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
