// Import required module using require()
const http = require('http');

// Define port number
const PORT = 3000;

// Create server using createServer()
const server = http.createServer((req, res) => {

    // Display request information in console
    console.log("Client requested URL:", req.url);

    // Set response header
    res.setHeader('Content-Type', 'text/html');

    // Handle different client requests
    if (req.url === '/') {
        res.write("<h1>Home Page</h1>");
        res.write("<p>Welcome to the Node.js Web Server</p>");
    } 
    else if (req.url === '/about') {
        res.write("<h1>About Page</h1>");
        res.write("<p>This server is created using Node.js http module.</p>");
    } 
    else if (req.url === '/contact') {
        res.write("<h1>Contact Page</h1>");
        res.write("<p>Email: example@email.com</p>");
    } 
    else {
        res.write("<h1>404 Error</h1>");
        res.write("<p>Page Not Found</p>");
    }

    // End response
    res.end();
});

// Run server using listen()
server.listen(PORT, () => {
    console.log(`Server is running successfully at http://localhost:${PORT}`);
});