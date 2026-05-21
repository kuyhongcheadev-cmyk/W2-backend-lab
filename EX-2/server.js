// server.js
const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    const route = `${method} ${url}`;

    switch (route) {
        case 'GET /':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(`
                <html>
                    <head><title>Home</title></head>
                    <body>
                        <h1>Welcome to the Home Page</h1>
                        <p>This is a simple Node.js server.</p>
                    </body>
                </html>
            `);
        
        case 'GET /about':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(`
                <html>
                    <head><title>about</title></head>
                    <body>
                        <p>ABOUT US: at CADT, we love Node.js!</p>
                    </body>
                </html> 
                `);
        
        case 'GET /contact-us':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(`
                <html>
                    <head><title>contact</title></head>
                    <body>
                        <p>You can reach us via email...</p>
                    </body>
                </html> 
                `);
        
        case 'GET /products':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(`
                <html>
                    <head><title>products</title></head>
                    <body>
                        <p>Buy one get one...</p>
                    </body>
                </html> 
                `);
        
        case 'GET /projects':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(`
                <html>
                    <head><title>projects</title></head>
                    <body>
                        <p>Here are our awesome projects</p>
                    </body>
                </html> 
                `);
        
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
