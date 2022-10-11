const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: "fail",
        error: "You are not logged in.",
      });
    }
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      status: "fail",
      message: "invalid token",
      error: error,
    });
  }
};
