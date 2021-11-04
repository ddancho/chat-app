const express = require("express");
const path = require("path");
const helmet = require("helmet");
const session = require("express-session");
const redis = require("redis");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

// server
const app = express();

// redis session
const redisClient = redis.createClient({
  host: "redis",
  port: 6379,
});
const RedisStore = require("connect-redis")(session);
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

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
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/session", sessionRoutes);

app.all("*", (req, res) => {
  res.status(404).json("Page Not Found");
});

app.listen(5000, () => {
  console.log("Server is up and running on port 5000...");
});
