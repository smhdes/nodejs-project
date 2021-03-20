const http = require("http");
const app = require("./app");
const io = require("socket.io")(http);

const port = process.env.PORT || 4000; // port value is global (on the real server port) or local port (3000 or difference port)

const server = http.createServer(app); // my middleware is app and we can use the  in the create server for get request and handle

server.listen(port); // we listen the port for all event on the my server
