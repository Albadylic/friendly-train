const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const queries = require("./queries");

const handlePublic = (request, response) => {
  const extension = path.extname(request.url).substring(1);

  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon"
  };

  const filePath = path.join(__dirname, "..", request.url);

  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { "content-type": "text/html" });
      response.end("Something went wrong with our dragons");
    } else {
      response.writeHead(200, { "content-type": extensionType[extension] });
      response.end(file);
    }
  });
};

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
    let { username, energy, sociability, animal } = helperExtractUser(
      allTheData
    );
    energy = stringToInteger(energy);
    queries.addUser(username, energy, sociability, animal, err => {
      if (err) {
        console.log("Error with submission");
      } else {
        response.writeHead(302, {
          "content-type": "text/html",
          Location: "/new"
        });
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

module.exports = { handleHome, handleSubmit, handlePublic };
