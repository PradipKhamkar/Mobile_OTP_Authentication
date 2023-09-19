import { Router } from "express";
import { sendOtp, verifyOtpAndRegister } from "../controllers/userController";
const route: Router = Router();

route.post("/register/sendotp", sendOtp);
route.post("/register/verify", verifyOtpAndRegister);

export default route;
