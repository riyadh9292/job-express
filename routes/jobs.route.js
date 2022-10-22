const express = require("express");
const {
  postAJob,
  getAllJobs,
  getSpecificJob,
  applySpecificJob,
  updateSpecificJob,
  fileUpload,
} = require("../controllers/jobs.controller");
const uploader = require("../middleware/uploader");

const verifyManager = require("../middleware/verifyManager");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
module.exports = router;

router.post("/", verifyToken, verifyManager, postAJob);
router.get("/", getAllJobs);
router.post("/file-upload", uploader.single("resume"), fileUpload);
router.get("/:id", getSpecificJob);
router.patch("/:id", verifyToken, verifyManager, updateSpecificJob);
router.post("/:id/apply", verifyToken, applySpecificJob);
// router.route("/").post(postAJob);
