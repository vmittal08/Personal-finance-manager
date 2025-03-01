const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express App
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mern_dashboard') // Use 127.0.0.1 instead of localhost
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Define a test route
app.get('/api/test', (req, res) => {
    res.status(200).json({ message: 'API is working!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
