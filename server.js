const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cluster = require("cluster");
const os = require("os");

const app = require("./app");

const numCpu = os.cpus().length;

// database connection
mongoose.connect(process.env.DATABASE_ATLAS).then(() => {
  console.log(`Database connection is successful 🛢`.red.bold);
});

// test home
app.get("/", (req, res, next) => {
  res.status(200).json({
    satus: "got it",
    message: "all is well",
    process_id: process.pid,
  });
  cluster.worker.kill();
});

// server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`process ${process.pid} running`.yellow.bold);
});

if (cluster.isMaster) {
  console.log(`Master worker`);
  for (let i = 0; i < numCpu; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(port, () => {
    console.log(`process ${process.pid} running`.yellow.bold);
  });
}
