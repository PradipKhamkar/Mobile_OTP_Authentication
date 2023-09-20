import { Router } from "express";
import {
  getLoggedInUser,
  login,
  logOutUser,
  resendOtp,
  sendOtp,
  verifyOtpAndRegister,
} from "../controllers/userController";
import { isJwtAuthTokenExit } from "../middleware/isJwtAutTokenExit";
import { isOtpTokenExit } from "../middleware/isOtpTokenExit";
const route: Router = Router();

// register route
route.post("/register/sendotp", sendOtp);
route.post("/verify/register", isOtpTokenExit, verifyOtpAndRegister, login);
route.post("/resentotp", isOtpTokenExit, resendOtp);

// login route
route.post("/login", login);
route.get("/getloggeduser", isJwtAuthTokenExit, getLoggedInUser);
route.get("/logout", logOutUser);

export default route;
