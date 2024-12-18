const express = require('express');
const Article = require('../models/Article');
const router = express.Router();

// Fetch top headlines
router.get('/top-headlines', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: { country: 'us', apiKey: process.env.NEWS_API_KEY },
    });
    res.json(response.data.articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top headlines', error });
  }
});

// Search articles
router.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: { q, apiKey: process.env.NEWS_API_KEY },
    });
    res.json(response.data.articles);
  } catch (error) {
    res.status(500).json({ message: 'Error searching articles', error });
  }
});

// Post new article
router.post('/articles', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newArticle = new Article({ title, content, date: new Date() });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error posting article', error });
  }
});

module.exports = router;
