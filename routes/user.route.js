const express = require("express");
const {
  signup,
  login,
  getUser,
  confirmEmail,
} = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.get("/me", verifyToken, getUser);
router.get("/signup/confirmation/:token", confirmEmail);

module.exports = router;
