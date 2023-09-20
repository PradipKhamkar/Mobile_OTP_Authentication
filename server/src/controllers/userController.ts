import {
  Request,
  Response,
  RequestHandler,
  request,
  NextFunction,
} from "express";
import bcrypt from "bcrypt";
import { sendError } from "../utils/sendError";
import { sendOtpCode, verifyOtp } from "../utils/otp";
import userModel from "../models/userModel";
import { getUserGeolocationData } from "../utils/getUserGeolocation";
import { createLoginToken, createOtpToken } from "../utils/createToken";
import { sendLoginCookie, sendOtpCookie } from "../utils/sendCookies";
import cloudinary from "cloudinary";

export const sendOtp: RequestHandler = async (req: Request, res: Response) => {
  try {
    const phoneNumber: any = req.query?.phoneNumber || null;
    const email: any = req.body?.email || null;

    if (phoneNumber && email) {
      const isPhoneNumberRegistered = await userModel.findOne({ phoneNumber });
      const isEmailRegistered = await userModel.findOne({ email });
      if (!isPhoneNumberRegistered) {
        if (!isEmailRegistered) {
          //sent otp
          const result = await sendOtpCode(phoneNumber);
          if (result?.status === "pending") {
            const token = await createOtpToken(phoneNumber);
            sendOtpCookie(res, token, phoneNumber);
          } else {
            sendError(res, 400, "somethings went wrong ! 🙄", true);
          }
        } else {
          sendError(res, 400, "Email Already Registered", true);
        }
      } else {
        sendError(res, 400, "Phone Already Registered", true);
      }
    } else {
      sendError(res, 400, "Email And Mobile Number Required", true);
    }
  } catch (error: any) {
    console.log(error);
    sendError(res, 400, "Failed To Send OTP 😕", error?.message);
  }
};

export const verifyOtpAndRegister: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const phoneNumber: any = req.query?.phoneNumber || null;
    const verificationCode: any = req.query?.verificationCode || null;

    const { firstName, lastName, password, email, profilePic } = req.body;

    if (phoneNumber && verificationCode) {
      // verifying OTP
      const result = await verifyOtp(phoneNumber, verificationCode);

      if (result.status === "approved") {
        const userLocationData = await getUserGeolocationData();

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //uploading image to cloudnary
        let cloudResult = null;
        if (profilePic) {
          cloudResult = await cloudinary.v2.uploader.upload(profilePic, {
            folder: "products",
          });
        }

        // save user data - register user
        const newUser = await userModel.create({
          firstName,
          lastName,
          email,
          profilePic: cloudResult === null ? "" : cloudResult?.url,
          phoneNumber,
          userLocationData: userLocationData?.data,
          password: hashPassword,
        });
        req.body = { phoneNumber: newUser.phoneNumber, password };
        next();
      } else {
        sendError(res, 400, "Invalid  OTP 😲", true);
      }
    } else {
      sendError(res, 400, "Phone Number & Verification Code Required", true);
    }
  } catch (error: any) {
    console.log(error);
    sendError(res, 400, "Failed to verifying otp", error);
  }
};

export const resendOtp: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const phoneNumber: any = req.query?.phoneNumber || null;
    if (phoneNumber) {
      const result = await sendOtpCode(phoneNumber);

      if (result.status === "pending") {
        res.status(200).json({
          success: true,
          message: `OTP Send Again 😍`,
        });
      } else {
        sendError(res, 400, "Failed To Resend OTP 😯 ", true);
      }
    } else {
      sendError(res, 400, "Phone Number Required 🙃", true);
    }
  } catch (error: any) {
    sendError(res, 400, "Failed To Resend OTP 😯 ", error.message);
  }
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, password } = req.body || null;

    if (phoneNumber && password) {
      const isUserExit = await userModel.findOne({ phoneNumber });
      if (isUserExit) {
        const checkPassword = await bcrypt.compare(
          password,
          isUserExit.password
        );
        if (checkPassword) {
          const token = await createLoginToken(isUserExit._id);
          sendLoginCookie(res, token);
        } else {
          sendError(res, 400, "Invalid PhoneNumber OR Password🙂", true);
        }
      } else {
        sendError(res, 400, "Invalid PhoneNumber OR Password🙂", true);
      }
    } else {
      sendError(res, 400, "PhoneNumber && Password Required 🙂", true);
    }
  } catch (error: any) {
    sendError(res, 400, "Failed To Login 🙄", error?.message);
  }
};

export const getLoggedInUser: RequestHandler = (
  req: Request | any,
  res: Response
) => {
  try {
    res.status(200).json({
      success: true,
      userData: req.user,
    });
  } catch (error: any) {
    sendError(res, 400, "Failed to get logged user", error.message);
  }
};

export const logOutUser: RequestHandler = (req: Request, res: Response) => {
  try {
    res.cookie("jwtAutToken", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "User Logged OUT 🥰",
    });
  } catch (error: any) {
    sendError(res, 400, "Failed To Logout", error?.message);
  }
};
