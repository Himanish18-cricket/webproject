const { check } = require("express-validator");
const { STATUS } = require("../Utils/ApplicationConstants");
const mongoose = require("mongoose");

exports.checkInput = [
    check("jobId")
        .trim()
        .notEmpty()
        .withMessage("Application must have a Job ID")
        .custom(async (jobId, { req }) => {
            if (!mongoose.Types.ObjectId.isValid(jobId)) {
                throw new Error("Invalid Job ID");
            }
        }),
    check("resume")
        .notEmpty()
        .withMessage("Applicant's Resume is required")
        .isURL()
        .withMessage("Invalid URL. Please provide a valid URL."),
];
