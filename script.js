const http = require("http");
const colors = require("colors");
const url = require("url");
const fs = require("fs");
const port = process.env.PORT || 5000;

http
  .createServer((req, res) => {
    const q = url.parse(req.url, true);
    if (q.query) {
      const query = JSON.stringify(q.query)
      console.log(`Query: ${query}`.red);
    }
    let fileName = ''
    switch (q.pathname) {
      case "/":
        fileName = "./index.html"
        break;
      case "/html":
        fileName = "./html.html";
        break;
    }
    console.log(`- Incoming request: ${req.url}`.cyan);
    fs.readFile(fileName, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(port);

console.log(`\nServer is listening on port ${port}...`.green);
