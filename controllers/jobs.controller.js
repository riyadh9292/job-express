const {
  postJobService,
  managerSpecificJobsService,
  gettingAllJobsService,
  gettingSpecificJobService,
  applySpecificJobService,
  updateSpecificJobService,
  jobDetailsService,
  updateManagerAfterJobPosting,
} = require("../services/jobs.service");
const cluster = require("cluster");

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await gettingAllJobsService(req.body);
    res.status(200).json({
      status: "success",
      message: "getting all jobs.",
      jobs: jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
exports.getDetailsJobController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.user);
    console.log(id);
    const job = await jobDetailsService(req.user._id, id);

    // const job = await gettingSpecificJobService(id);
    res.status(200).json({
      status: "success",
      message: "getting jobs.",
      jobs: job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
exports.getSpecificJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await gettingSpecificJobService(id);
    res.status(200).json({
      status: "success",
      message: "getting all jobs.",
      jobs: job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
exports.updateSpecificJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await updateSpecificJobService(id, req.body);
    if (job === "already applied") {
      return res.status(400).json({
        status: "failed",
        message: "You have already applied for this job.",
        // jobs: job,
      });
    }
    if (!job) {
      return res.status(400).json({
        status: "failed",
        message: "deadline is over",
        // jobs: job,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Apply successfull.",
      jobs: job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
exports.applySpecificJob = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.user._id);

    const job = await applySpecificJobService(id, req.user._id);
    if (job === "already applied") {
      return res.status(400).json({
        status: "failed",
        message: "You already apply for this job.",
        // jobs: job,
      });
    }
    if (!job) {
      return res.status(400).json({
        status: "failed",
        message: "deadline is over",
        // jobs: job,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Apply successfull.",
      jobs: job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
exports.postAJob = async (req, res) => {
  try {
    const job = await postJobService(req.body);
    const updateUser = await updateManagerAfterJobPosting(
      job?.id,
      req.user._id
    );
    res.status(201).json({
      status: "success",
      message: "job post created.",
      job: job,
      updateUser: updateUser,
    });
    cluster.worker.kill();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
exports.getManagerSpecificJobController = async (req, res) => {
  try {
    console.log(req.user);
    console.log("manager sce");
    const jobs = await managerSpecificJobsService(req.user);
    res.status(200).json({
      status: "success",
      message: "getting jobs",
      jobs: jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
