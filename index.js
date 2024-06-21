require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes.js");
const songRoutes = require("./routes/songs");
const { authenticate } = require("./public/js/authMiddleware.js");
app.use(bodyParser.json());
app.use(cookieParser());
const mongoose = require("mongoose");

const Song = require("./models/Song");

const Playlist = require("./models/Playlist");
const authRoutes = require("./routes/user.routes.js");

const { songs, seedSongs } = require("./seeds/songSeed");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.user = req.user; // Set req.user to res.locals.user
  next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(songRoutes);
app.use(authRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/Music-Player")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const { isLoggedIn } = require("./public/js/authMiddleware.js");
app.get("/", (req, res) => {
  if (isLoggedIn(req)) {
    res.render("index", { songs: songs });
  } else {
    res.redirect("alert");
  }
});
app.use((req, res, next) => {
  res.locals.user = req.user; // Set req.user to res.locals.user
  next();
});

app.get("/alert", (req, res) => {
  res.render("alert");
});

const port = 8000;
app.listen(port, () => {
  console.log(`server at https://localhost:${port}`);
});
