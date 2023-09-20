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
exports.isJwtAuthTokenExit = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const sendError_1 = require("../utils/sendError");
const isJwtAuthTokenExit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwtAutToken) {
            const isTokenIsVerify = jsonwebtoken_1.default.verify((_b = req.cookies) === null || _b === void 0 ? void 0 : _b.jwtAutToken, process.env.JWT_KEY || "");
            if (isTokenIsVerify) {
                const userId = isTokenIsVerify.userId;
                const requestedUser = yield userModel_1.default
                    .findById(userId)
                    .select("-password");
                req.user = requestedUser;
                next();
            }
            else {
                (0, sendError_1.sendError)(res, 400, "", null);
            }
        }
        else {
            (0, sendError_1.sendError)(res, 400, "", null);
        }
    }
    catch (error) {
        (0, sendError_1.sendError)(res, 400, "", null);
    }
});
exports.isJwtAuthTokenExit = isJwtAuthTokenExit;
