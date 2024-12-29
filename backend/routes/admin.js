// routes/admin.js
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// Fetch pending articles
router.get('/pending-articles', async (req, res) => {
    try {
        const articles = await Article.find({ approved: false });
        res.json(articles);
        console.log(articles);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching pending articles' });
     console.log(error);
    }
});

// Approve an article
router.post('/approve-article/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Article.findByIdAndUpdate(id, { approved: true }, { new: true });
        res.json({ message: 'Article approved', article });
    } catch (error) {
        res.status(500).json({ error: 'Error approving article' });
    }
});

module.exports = router;
