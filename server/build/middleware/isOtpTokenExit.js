"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOtpTokenExit = void 0;
const sendError_1 = require("../utils/sendError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isOtpTokenExit = (req, res, next) => {
    var _a;
    try {
        if ((_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.otpToken) {
            const tokenVerify = jsonwebtoken_1.default.verify(req.cookies.otpToken, process.env.JWT_KEY || "");
            if (!tokenVerify) {
                (0, sendError_1.sendError)(res, 400, "OTP Token Expired 😕", true);
            }
            else {
                req.query.phoneNumber = tokenVerify === null || tokenVerify === void 0 ? void 0 : tokenVerify.phoneNumber;
                next();
            }
        }
        else {
            (0, sendError_1.sendError)(res, 400, "OTP Token Not Exit 😥", true);
        }
    }
    catch (error) {
        (0, sendError_1.sendError)(res, 400, "Something's Went's Wrong 😥", error.message);
    }
};
exports.isOtpTokenExit = isOtpTokenExit;
