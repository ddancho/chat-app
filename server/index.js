const express = require("express");
const path = require("path");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// server
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(helmet());

// public folder - images
app.use("/images", express.static(path.join(__dirname, "public/images")));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Server is up and running on port 5000...");
});
