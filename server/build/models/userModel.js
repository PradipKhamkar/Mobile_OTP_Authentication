"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "please enter firstName"],
        trim: true,
    },
    lastName: { type: String, required: [true, "please enter lastName"] },
    phoneNumber: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "please enter phone number"],
    },
    profilePic: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "please enter email"],
    },
    password: {
        type: String,
        required: [true, "please enter password"],
    },
    userLocationData: { type: Object },
});
const userModel = (0, mongoose_1.model)("otpUser", userSchema);
exports.default = userModel;
