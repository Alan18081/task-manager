const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const createIO = require("socket.io");
const http = require("http");
const { port, mongodbUrl } = require("./config");
const cors = require("./middlewares/allowCors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("*", cors);

mongoose.Promise = global.Promise;

mongoose.connect(mongodbUrl);

require("./models/User");
require("./models/Task");
require("./models/Message");
require("./models/Chat");

require("./services/passport");

require("./routes/users")(app);
require("./routes/tasks")(app);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.get("/*", express.static(path.join(__dirname, "/client/build/static")));

const server = http.createServer(app);

const io = createIO(server);

require("./sockets/chat")(io);

server.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
