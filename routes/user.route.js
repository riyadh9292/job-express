const express = require("express");
const { signup, login, getUser } = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.get("/me", verifyToken, getUser);

module.exports = router;
