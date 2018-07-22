const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const createIO = require("socket.io");
const http = require("http");
const { port, mongodbUrl } = require("./config/index");
const cors = require("./middlewares/allowCors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("*", cors);

mongoose.Promise = global.Promise;

mongoose.connect(mongodbUrl,{
  useNewUrlParser: true
});

const server = http.createServer(app);

const io = createIO(server);

require("./services/passport");

require("./models/User");
require("./models/Message");
require("./models/Task");
require("./models/Chat");


require("./routes/users")(app);
require("./routes/tasks")(app);
require("./routes/messages")(app);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.get("/*", express.static(path.join(__dirname, "/client/build/static")));

require("./sockets/chat")(io);
require("./sockets/online")(io);
require("./sockets/tasks")(io);
require("./sockets/messages")(io);

server.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
