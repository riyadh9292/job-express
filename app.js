const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/user.route");

//middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.status(200).json({});
});
app.use("/user", authRoute);
module.exports = app;
