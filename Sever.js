//Supawich saard section 1

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8081;

const server = http.createServer((req, res) => {
    // บันทึก log เส้นทางที่มี request เข้ามา
    console.log(`Req: ${req.url}`);

    if (req.url === '/hello') {
        // Route: /hello -> ส่ง Plain Text พร้อม timestamp
        const timestamp = Date.now();
        console.log(`Hello from Server: ${timestamp}`);
        
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Hello from Server: ${timestamp}`);

    } else if (req.url === '/signin') {
        // Route: /signin -> ส่งไฟล์ sign-in.html
        const filePath = path.join(__dirname, 'sign-in.html');
        
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            }
        });

    } else {
        // Route อื่น ๆ -> ส่งไฟล์ error.html พร้อม status 404
        const filePath = path.join(__dirname, 'error.html');
        
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            }
        });
    }
});

// เริ่มให้ Server ทำงานที่ Port 8081
server.listen(PORT, () => {
    console.log(`Listening on the port ${PORT}`);
});
