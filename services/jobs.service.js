const Jobs = require("../models/Jobs");

exports.gettingAllJobsService = async () => {
  const jobs = await Jobs.find();
  return jobs;
};
exports.postJobService = async (jobInfo) => {
  const job = await Jobs.create(jobInfo);
  return job;
};
exports.updateSpecificJobService = async (jobId, data) => {
  const specificJob = await Jobs.findOneAndUpdate({ _id: jobId }, data);

  return specificJob;
};
exports.jobDetailsService = async (userId, jobId) => {
  const specificJob = await Jobs.find({ _id: jobId }).populate(
    "appliedCandidates"
  );

  return specificJob;
};
exports.applySpecificJobService = async (jobId, userId) => {
  const specificJob = await Jobs.findById(jobId);

  if (specificJob.isDeadlineOver()) {
    return;
  }
  if (specificJob.appliedCandidates.includes(userId)) {
    return "already applied";
  }
  specificJob.appliedCandidates.push(userId);
  specificJob.save();
  const job = await Jobs.findOneAndUpdate(
    { _id: jobId },
    { $inc: { applied: 1 } }
  );
  return job;
};
exports.gettingSpecificJobService = async (jobId) => {
  const job = await Jobs.find({ _id: jobId }).populate("manager");
  return job;
};
exports.managerSpecificJobsService = async (manager) => {
  const job = await Jobs.find({ manager: manager }).populate("manager");
  return job;
};
