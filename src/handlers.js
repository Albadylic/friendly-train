const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const queries = require("./queries");

const handleHome = (request, response) => {
  const filePath = path.join(__dirname, "../public", "index.html");
  fs.readFile(filePath, (err, file) => {
    if (err) {
      response.writeHead(404, { "content-type": "text/html" });
      response.end("<h1>Page not found</h1>");
    } else {
      response.writeHead(200, { "content-type": "text/html" });
      response.end(file);
    }
  });
};

const handleSubmit = (request, response) => {
  let allTheData = "";
  request.on("data", chunk => {
    allTheData += chunk;
  });
  request.on("end", () => {
    // Add new chunk to the DB
  });

  response.end();
};

module.exports = { handleHome, handleSubmit };
