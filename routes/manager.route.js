const express = require("express");
const {
  getManagerSpecificJobController,
  getDetailsJobController,
} = require("../controllers/jobs.controller");
const verifyManager = require("../middleware/verifyManager");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

module.exports = router;

router.get(
  "/jobs",
  verifyToken,
  // verifyManager,
  getManagerSpecificJobController
);
router.get("/jobs/:id", verifyToken, getDetailsJobController);
// router.route("/").post(postAJob);
