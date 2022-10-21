const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const authRoute = require("./routes/user.route");
const jobsRoute = require("./routes/jobs.route");
const managerRoute = require("./routes/manager.route");

//middlewares
app.use(express.json());
app.use(cors());

app.use("/user", authRoute);
app.use("/jobs", jobsRoute);
app.use("/manager", managerRoute);

module.exports = app;
