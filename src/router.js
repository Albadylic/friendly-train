const handlers = require("./handlers");

const router = (request, response) => {
  if (request.url === "/") {
    handlers.handleHome(request, response);
  } else {
    response.writeHead(404);
    response.end("Page not found");
  }
};

module.exports = router;
