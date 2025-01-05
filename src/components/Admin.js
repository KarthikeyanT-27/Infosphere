import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';

function Admin() {
    const [pendingArticles, setPendingArticles] = useState([]);

    useEffect(() => {
        const fetchPendingArticles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/pending-articles');
                setPendingArticles(response.data);
            } catch (error) {
                console.error('Error fetching pending articles', error);
            }
        };
        fetchPendingArticles();
    }, []);

    const approveArticle = async (id) => {
        try {
            await axios.post(`http://localhost:5000/api/admin/approve-article/${id}`);
            setPendingArticles(pendingArticles.filter(article => article._id !== id));
        } catch (error) {
            console.error('Error approving article', error);
        }
    };
    const rejectArticle = async (id) => {
        try {
            await axios.post(`http://localhost:5000/api/admin/reject-article/${id}`);
            setPendingArticles(pendingArticles.filter(article => article._id !== id));
        } catch (error) {
            console.error('Error rejecting article', error);
        }
    };


    return (
        <div className='admin'>
            <h1>Admin Portal</h1>
            <h2>Pending Articles</h2>
            <ul>
                {pendingArticles.map((article, index) => (
                    <li key={index}>
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                        <p>{article.date}</p>
                        <p>{article.reporter}</p>
                        <button onClick={() => approveArticle(article._id)}>Approve</button>
                        <button className='reject' onClick={()=>rejectArticle(article._id)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Admin;
