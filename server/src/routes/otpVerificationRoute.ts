import { Router } from "express";
import { sentOtp } from "../controllers/otpVerficationController";

const route: Router = Router();

route.get("/sentotp", sentOtp);

export default route;
