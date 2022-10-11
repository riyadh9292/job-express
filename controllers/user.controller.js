const {
  signupService,
  findUserByEmailService,
} = require("../services/user.service");
const { generateToken } = require("../utils/Token");

exports.signup = async (req, res) => {
  try {
    const user = await signupService(req.body);
    res.status(201).json({
      status: "success",
      message: "created user",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide valid credentials.",
      });
    }
    const user = await findUserByEmailService(email);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found.Please create an account first",
      });
    }
    const isPasswordValid = user.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "email or password is wrong",
      });
    }
    const token = generateToken(user);
    const { password: pass, ...others } = user.toObject();
    res.status(200).json({
      status: "Success",
      message: "Successfully Logged In.",
      data: { user: others, token },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await findUserByEmailService(req.user?.email);
    const { password: pass, ...others } = user.toObject();
    res.status(200).json({
      status: "Success",
      data: others,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
