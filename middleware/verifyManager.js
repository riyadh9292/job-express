module.exports = async (req, res, next) => {
  // console.log(req.user._id === req.body.manager.id);
  // console.log(req.user.role);
  if (req.user.role !== "manager") {
    return res.status(401).json({
      status: "fail",
      error: "You are not allowed to post a job.",
    });
  }
  if (!req.body?.manager) {
    return res.status(401).json({
      status: "fail",
      error: "please provide manager id.",
    });
  }
  if (req.user._id !== req.body?.manager) {
    return res.status(401).json({
      status: "fail",
      error: "You are not the actual manager who post this job.",
    });
  }
  next();
};
