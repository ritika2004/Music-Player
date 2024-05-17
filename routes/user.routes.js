const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user.controller.js");
const verifyJWT = require("../middlewares/auth.middleware.js");

router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/logout", (req, res) => {
  res.render("logout");
});

router.post("/register", controllers.registerUser);
router.post("/login", controllers.loginUser);
router.post("/logout", verifyJWT, controllers.logoutUser);

module.exports = router;
