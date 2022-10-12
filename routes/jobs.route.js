const express = require("express");
const {
  postAJob,
  getAllJobs,
  getSpecificJob,
  applySpecificJob,
  updateSpecificJob,
} = require("../controllers/jobs.controller");

const verifyManager = require("../middleware/verifyManager");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
module.exports = router;

router.post("/", verifyToken, verifyManager, postAJob);
router.get("/", getAllJobs);
router.get("/:id", getSpecificJob);
router.patch("/:id", verifyToken, verifyManager, updateSpecificJob);
router.post("/:id/apply", verifyToken, applySpecificJob);
// router.route("/").post(postAJob);
