"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const isJwtAutTokenExit_1 = require("../middleware/isJwtAutTokenExit");
const isOtpTokenExit_1 = require("../middleware/isOtpTokenExit");
const route = (0, express_1.Router)();
// register route
route.post("/register/sendotp", userController_1.sendOtp);
route.post("/verify/register", isOtpTokenExit_1.isOtpTokenExit, userController_1.verifyOtpAndRegister, userController_1.login);
route.post("/resentotp", isOtpTokenExit_1.isOtpTokenExit, userController_1.resendOtp);
// login route
route.post("/login", userController_1.login);
route.get("/getloggeduser", isJwtAutTokenExit_1.isJwtAuthTokenExit, userController_1.getLoggedInUser);
route.get("/logout", userController_1.logOutUser);
exports.default = route;
