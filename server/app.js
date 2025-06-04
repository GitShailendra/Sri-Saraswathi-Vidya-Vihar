require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/AdminRoutes');
const gallaryRoutes = require('./routes/gallaryRoutes')
const contactRoutes = require('./routes/ContactRoutes');
const ResultRoutes = require('./routes/ResultRoutes');
connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/admin', adminRoutes);
app.use('/gallery', gallaryRoutes);
app.use('/contact', contactRoutes);
app.use('/results', ResultRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


