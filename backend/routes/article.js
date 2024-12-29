const express = require('express');
const Article = require('../models/Article');
const router = express.Router();





// Endpoint to get news from MongoDB
router.get('/articles', async (req, res) => {
    try {
        const articles = await Article.find({ approved: true });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching articles' });
    }
});




// Post new article
router.post('/articles', async (req, res) => {
  const { title, content,link,place } = req.body;
  try {
    const newArticle = new Article({ title, content, date: new Date() ,link, place});
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error posting article', error });
  }
});

module.exports = router;
