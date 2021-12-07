const express = require("express");
const path = require("path");
const helmet = require("helmet");
const session = require("express-session");
const redis = require("redis");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");

const onSocketIo = require("./socketio/socket").onSocketIo;

// server
const app = express();
const server = require("http").createServer(app);

// io
const io = require("socket.io")(server, { transports: ["websocket"] });

// redis session middleware
const redisClient = redis.createClient({
  host: "redis",
  port: 6379,
});
const RedisStore = require("connect-redis")(session);

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: false,
});

app.use(sessionMiddleware);

// middleware
app.use(express.json());
app.use(helmet());

// reverse proxy
app.enable("trust proxy");

// public folder - images
app.use("/images", express.static(path.join(__dirname, "public/images")));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/session", sessionRoutes);
app.use("/api/v1/conversations", conversationRoutes);
app.use("/api/v1/messages", messageRoutes);

app.all("*", (req, res) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

// websocket logic
const websocket = { io };
onSocketIo.call(websocket);

server.listen(5000, () => {
  console.log("Server is up and running on port 5000...");
});
