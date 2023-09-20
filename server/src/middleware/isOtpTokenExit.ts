import { NextFunction, Request, RequestHandler, Response } from "express";
import { sendError } from "../utils/sendError";
import jwt from "jsonwebtoken";

export const isOtpTokenExit: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req?.cookies?.otpToken) {
      const tokenVerify: any = jwt.verify(
        req.cookies.otpToken,
        process.env.JWT_KEY || ""
      );
      if (!tokenVerify) {
        sendError(res, 400, "OTP Token Expired 😕", true);
      } else {
        req.query.phoneNumber = tokenVerify?.phoneNumber;
        next();
      }
    } else {
      sendError(res, 400, "OTP Token Not Exit 😥", true);
    }
  } catch (error: any) {
    sendError(res, 400, "Something's Went's Wrong 😥", error.message);
  }
};
