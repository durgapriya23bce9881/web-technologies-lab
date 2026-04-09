const express = require('express');
const app = express();

const userRoutes = require('./routes/users');

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send("Welcome to the User API Server");
});

// Routes
app.use('/users', userRoutes);

// Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});