const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");
const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide firstName"],
      trim: true,
      minLength: [3, "Name at least 3 characters"],
      maxLength: [100, "Name at most 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide firstName"],
      trim: true,
      minLength: [3, "Name at least 3 characters"],
      maxLength: [100, "Name at most 10000 characters"],
    },
    appliedCandidates: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],

    location: {
      type: String,
      required: [true, "Please provide location"],
    },

    jobType: {
      type: String,
      default: "on-site",
      enum: ["remote", "on-site", "hybrid"],
    },
    employmentStatus: {
      type: String,
      default: "full-time",
      enum: ["full-time", "part-time", "contractual"],
      required: [true, "Please provide an employment status"],
    },
    manager: {
      // name: {
      //   type: String,
      //   required: true,
      // },
      // email: {
      //   type: String,
      //   validate: [validator.isEmail, "Provide a valid email"],
      //   trim: true,
      //   lowercase: true,
      //   required: [true, "Manager email address is required"],
      // },
      type: ObjectId,
      ref: "User",
      required: true,
      // id: {
      //   type: ObjectId,
      //   ref: "User",
      // },
    },

    benefits: {
      type: String,
      trim: true,
    },
    salary: {
      type: Number,
      trim: true,
    },
    vacancy: {
      type: Number,
    },
    experience: {
      type: Number,
      trim: true,
    },
    applied: {
      type: Number,
      default: 0,
    },
    deadline: {
      type: Date,
      default: new Date(new Date().setDate(new Date().getDate() + 30)),
    },
  },
  {
    timeStamp: true,
  }
);

jobSchema.methods.isDeadlineOver = function () {
  return new Date() > this.deadline;
};

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
