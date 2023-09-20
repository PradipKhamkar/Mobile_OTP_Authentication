"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOutUser = exports.getLoggedInUser = exports.login = exports.resendOtp = exports.verifyOtpAndRegister = exports.sendOtp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendError_1 = require("../utils/sendError");
const otp_1 = require("../utils/otp");
const userModel_1 = __importDefault(require("../models/userModel"));
const getUserGeolocation_1 = require("../utils/getUserGeolocation");
const createToken_1 = require("../utils/createToken");
const sendCookies_1 = require("../utils/sendCookies");
const cloudinary_1 = __importDefault(require("cloudinary"));
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const phoneNumber = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.phoneNumber) || null;
        const email = ((_b = req.body) === null || _b === void 0 ? void 0 : _b.email) || null;
        if (phoneNumber && email) {
            const isPhoneNumberRegistered = yield userModel_1.default.findOne({ phoneNumber });
            const isEmailRegistered = yield userModel_1.default.findOne({ email });
            if (!isPhoneNumberRegistered) {
                if (!isEmailRegistered) {
                    //sent otp
                    const result = yield (0, otp_1.sendOtpCode)(phoneNumber);
                    if ((result === null || result === void 0 ? void 0 : result.status) === "pending") {
                        const token = yield (0, createToken_1.createOtpToken)(phoneNumber);
                        (0, sendCookies_1.sendOtpCookie)(res, token, phoneNumber);
                    }
                    else {
                        (0, sendError_1.sendError)(res, 400, "somethings went wrong ! 🙄", true);
                    }
                }
                else {
                    (0, sendError_1.sendError)(res, 400, "Email Already Registered", true);
                }
            }
            else {
                (0, sendError_1.sendError)(res, 400, "Phone Already Registered", true);
            }
        }
        else {
            (0, sendError_1.sendError)(res, 400, "Email And Mobile Number Required", true);
        }
    }
    catch (error) {
        console.log(error);
        (0, sendError_1.sendError)(res, 400, "Failed To Send OTP 😕", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.sendOtp = sendOtp;
const verifyOtpAndRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const phoneNumber = ((_c = req.query) === null || _c === void 0 ? void 0 : _c.phoneNumber) || null;
        const verificationCode = ((_d = req.query) === null || _d === void 0 ? void 0 : _d.verificationCode) || null;
        const { firstName, lastName, password, email, profilePic } = req.body;
        if (phoneNumber && verificationCode) {
            // verifying OTP
            const result = yield (0, otp_1.verifyOtp)(phoneNumber, verificationCode);
            if (result.status === "approved") {
                const userLocationData = yield (0, getUserGeolocation_1.getUserGeolocationData)();
                // hashing password
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashPassword = yield bcrypt_1.default.hash(password, salt);
                //uploading image to cloudnary
                let cloudResult = null;
                if (profilePic) {
                    cloudResult = yield cloudinary_1.default.v2.uploader.upload(profilePic, {
                        folder: "products",
                    });
                }
                // save user data - register user
                const newUser = yield userModel_1.default.create({
                    firstName,
                    lastName,
                    email,
                    profilePic: cloudResult === null ? "" : cloudResult === null || cloudResult === void 0 ? void 0 : cloudResult.url,
                    phoneNumber,
                    userLocationData: userLocationData === null || userLocationData === void 0 ? void 0 : userLocationData.data,
                    password: hashPassword,
                });
                req.body = { phoneNumber: newUser.phoneNumber, password };
                next();
            }
            else {
                (0, sendError_1.sendError)(res, 400, "Invalid  OTP 😲", true);
            }
        }
        else {
            (0, sendError_1.sendError)(res, 400, "Phone Number & Verification Code Required", true);
        }
    }
    catch (error) {
        console.log(error);
        (0, sendError_1.sendError)(res, 400, "Failed to verifying otp", error);
    }
});
exports.verifyOtpAndRegister = verifyOtpAndRegister;
const resendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const phoneNumber = ((_e = req.query) === null || _e === void 0 ? void 0 : _e.phoneNumber) || null;
        if (phoneNumber) {
            const result = yield (0, otp_1.sendOtpCode)(phoneNumber);
            if (result.status === "pending") {
                res.status(200).json({
                    success: true,
                    message: `OTP Send Again 😍`,
                });
            }
            else {
                (0, sendError_1.sendError)(res, 400, "Failed To Resend OTP 😯 ", true);
            }
        }
        else {
            (0, sendError_1.sendError)(res, 400, "Phone Number Required 🙃", true);
        }
    }
    catch (error) {
        (0, sendError_1.sendError)(res, 400, "Failed To Resend OTP 😯 ", error.message);
    }
});
exports.resendOtp = resendOtp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber, password } = req.body || null;
        if (phoneNumber && password) {
            const isUserExit = yield userModel_1.default.findOne({ phoneNumber });
            if (isUserExit) {
                const checkPassword = yield bcrypt_1.default.compare(password, isUserExit.password);
                if (checkPassword) {
                    const token = yield (0, createToken_1.createLoginToken)(isUserExit._id);
                    (0, sendCookies_1.sendLoginCookie)(res, token);
                }
                else {
                    (0, sendError_1.sendError)(res, 400, "Invalid PhoneNumber OR Password🙂", true);
                }
            }
            else {
                (0, sendError_1.sendError)(res, 400, "Invalid PhoneNumber OR Password🙂", true);
            }
        }
        else {
            (0, sendError_1.sendError)(res, 400, "PhoneNumber && Password Required 🙂", true);
        }
    }
    catch (error) {
        (0, sendError_1.sendError)(res, 400, "Failed To Login 🙄", error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.login = login;
const getLoggedInUser = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            userData: req.user,
        });
    }
    catch (error) {
        (0, sendError_1.sendError)(res, 400, "Failed to get logged user", error.message);
    }
};
exports.getLoggedInUser = getLoggedInUser;
const logOutUser = (req, res) => {
    try {
        res.cookie("jwtAutToken", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json({
            success: true,
            message: "User Logged OUT 🥰",
        });
    }
    catch (error) {
        (0, sendError_1.sendError)(res, 400, "Failed To Logout", error === null || error === void 0 ? void 0 : error.message);
    }
};
exports.logOutUser = logOutUser;
