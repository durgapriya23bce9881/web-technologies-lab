// Import express
const express = require('express');

// Create app
const app = express();

// ------------------------------
// 1. Global Middleware (Application-level)
// ------------------------------
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[GLOBAL] ${req.method} ${req.url} - ${timestamp}`);
    next(); // pass control to next middleware
});

// ------------------------------
// 2. Second Global Middleware (Chaining)
// ------------------------------
app.use((req, res, next) => {
    console.log('[GLOBAL] Second middleware executed');
    next();
});

// ------------------------------
// 3. Route-level Middleware
// ------------------------------
const routeMiddleware = (req, res, next) => {
    console.log('[ROUTE] Route-specific middleware executed');
    next();
};

// ------------------------------
// Routes
// ------------------------------

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to Middleware Demo');
});

// Route with route-level middleware
app.get('/users', routeMiddleware, (req, res) => {
    res.send('User list accessed');
});

// Route demonstrating multiple middleware layers
app.get(
    '/products',
    (req, res, next) => {
        console.log('[ROUTE] First middleware for /products');
        next();
    },
    (req, res, next) => {
        console.log('[ROUTE] Second middleware for /products');
        next();
    },
    (req, res) => {
        res.send('Products page');
    }
);

// ------------------------------
// Server
// ------------------------------
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});