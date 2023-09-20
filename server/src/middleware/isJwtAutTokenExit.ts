import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { sendError } from "../utils/sendError";

export const isJwtAuthTokenExit = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.cookies?.jwtAutToken) {
      const isTokenIsVerify: any = jwt.verify(
        req.cookies?.jwtAutToken,
        process.env.JWT_KEY || ""
      );
      if (isTokenIsVerify) {
        const userId = isTokenIsVerify.userId;
        const requestedUser = await userModel
          .findById(userId)
          .select("-password");
        req.user = requestedUser;
        next();
      } else {
        sendError(res, 400, "", null);
      }
    } else {
      sendError(res, 400, "", null);
    }
  } catch (error: any) {
    sendError(res, 400, "", null);
  }
};
