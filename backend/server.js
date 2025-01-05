const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv=require('dotenv');
const express=require('express');
const mongoose=require('mongoose');



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/Infosphere", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads',express.static('uploads'));

 
   
// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const adminRoutes=require('./routes/admin');
app.use('/api/admin',adminRoutes);

const articleRoutes = require('./routes/article');
app.use('/api/article', articleRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
