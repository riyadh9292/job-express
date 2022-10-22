const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { ObjectId } = mongoose.Schema.Types;
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    jobs: [
      {
        type: ObjectId,
        ref: "Job",
      },
    ],
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 3,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: "Password is not stong enough",
      },
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords do not match",
      },
    },
    role: {
      type: String,
      enum: ["manager", "candidate", "admin"],
      default: "candidate",
    },
    firstName: {
      type: String,
      required: [true, "Please provide firstName"],
      trim: true,
      minLength: [3, "Name at least 3 characters"],
      maxLength: [100, "Name at most 100 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide firstName"],
      trim: true,
      minLength: [3, "Name at least 3 characters"],
      maxLength: [100, "Name at most 100 characters"],
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "please provide a valid phone number.",
      ],
    },

    status: {
      type: String,
      default: "in-active",
      enum: ["active", "in-active", "blocked"],
    },
    confirmationToken: String,
    confirmationTokenExpires: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timeStamp: true,
  }
);
userSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password, 2);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.generateConfirmationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.confirmationToken = token;

  const date = new Date();

  date.setDate(date.getDate() + 1);
  this.confirmationTokenExpires = date;

  return token;
};

userSchema.methods.comparePassword = function (pasword, hashPassword) {
  const isValid = bcrypt.compareSync(pasword, hashPassword);
  return isValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
