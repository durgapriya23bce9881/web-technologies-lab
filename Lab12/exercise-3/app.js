const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// ------------------------------
// MongoDB Connection
// ------------------------------
mongoose.connect('mongodb://127.0.0.1:27017/userDB')
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.error('Database connection error:', err);
});

// Root route
app.get('/', (req, res) => {
    res.send('MongoDB CRUD API Running');
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});