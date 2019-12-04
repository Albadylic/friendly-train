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
    let { username, quality } = helperExtractUser(allTheData);
    quality = stringToInteger(quality);
    queries.addUser(username, quality, err => {
      if (err) {
        console.log("Error with submission");
      } else {
        response.writeHead(200, { "content-type": "text/html" });
        response.end();
      }
    });
  });

  response.end();
};

const helperExtractUser = dataStream => {
  return querystring.parse(dataStream);
};

const stringToInteger = str => {
  return parseInt(str);
};

module.exports = { handleHome, handleSubmit };
