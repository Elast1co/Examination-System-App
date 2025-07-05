// app.js

const express = require('express');
const cors = require('cors'); 

const app = express();


app.use(cors());

// Middleware
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);  

// Optional: Root check
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
