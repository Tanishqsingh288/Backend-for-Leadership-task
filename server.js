const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Add a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the API!'); // You can customize this message
});

// Use the userRoutes for any routes starting with /api
app.use('/api', userRoutes);

// Export the app for Vercel
module.exports = app;
