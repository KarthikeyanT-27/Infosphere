const express = require('express');
const Article = require('../models/Article');
const router = express.Router();





// Endpoint to get news from MongoDB
router.get('/articles', async (req, res) => {
    try {
      const oneDay=new Date();
      oneDay.setDate(oneDay.getDate()-7);      
      const articles = await Article.find({ approved: true,
        date:{$gte:oneDay} });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching articles' });
    }
});


//category  wise shortlisted news
router.get('/news', async (req, res) => {
  try {
    const oneDay=new Date();
      oneDay.setDate(oneDay.getDate()-1); 
     const category=req.query.category;
     const news =category
     ? await Article.find({category})
     : await Article.find();
     res.json(news);
  } catch (error) {
      res.status(500).json({ error: 'Error short fetching articles' });
  }
});

// Post new article
router.post('/articles', async (req, res) => {
  const { title, content,link,place,category } = req.body;
  try {
    const newArticle = new Article({ title, content, date: new Date() ,link, place,category});
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error posting article', error });
  }
});

module.exports = router;
