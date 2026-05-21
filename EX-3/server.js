// server.js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('Welcome to our Homepage! ^^');
    }

    if (url === '/contact' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(`
            <html>
                <head><title>Contact</title></head>
                <body>
                    <h1>Contact Us</h1>
                    <form method="POST" action="/contact">
                        <label>Name: <input type="text" name="name" placeholder="Your name" /></label>
                        <br/><br/>
                        <button type="submit">Submit</button>
                    </form>
                </body>
            </html>
        `);
    }

    if (url === '/contact' && method === 'POST') {
        let body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsed = new URLSearchParams(Buffer.concat(body).toString());
            const name = parsed.get('name');

            if (!name || name.trim() === '') {
                res.writeHead(400, { 'Content-Type': 'text/html' });
                return res.end(`
                    <html>
                        <body>
                            <h2>Error: Name field cannot be empty.</h2>
                            <a href="/contact">Go back</a>
                        </body>
                    </html>
                `);
            }

            console.log('Received submission:', name);

            fs.appendFile('submissions.txt', name + '\n', (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    return res.end('Server error while saving submission.');
                }

                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(`
                    <html>
                        <head><title>Success</title></head>
                        <body>
                            <h1>Thank you ${name}!</h1>
                            <p>Submission has been saved.</p>
                            <a href="/contact">Submit another</a>
                        </body>
                    </html>
                `);
            });
        });

        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('404 Not Found');
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});