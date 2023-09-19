import { Request, Response, RequestHandler } from "express";
import bcrypt from "bcrypt";
import { sendError } from "../utils/sendError";
import { sendOtpCode, verifyOtp } from "../utils/otp";
import userModel from "../models/userModel";
import { getUserGeolocationData } from "../utils/getUserGeolocation";

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
            res.status(200).json({
              success: true,
              message: `Otp sent to ${phoneNumber} 😎`,
            });
          } else {
            sendError(res, 400, "somethings went wrong ! 🙄", null);
          }
        } else {
          sendError(res, 400, "Email Already Registered", null);
        }
      } else {
        sendError(res, 400, "Phone Already Registered", null);
      }
    } else {
      sendError(res, 400, "Email And Mobile Number Required", null);
    }
  } catch (error: any) {
    console.log(error);
    sendError(res, 400, "Failed To Send OTP 😕", error?.message);
  }
};

export const verifyOtpAndRegister: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const phoneNumber: any = req.query?.phoneNumber || null;
    const verificationCode: any = req.query?.verificationCode || null;
    const { firstName, lastName, password, email } = req.body;
    console.log(phoneNumber, verificationCode);
    if (phoneNumber && verificationCode) {
      // verifying OTP
      const result = await verifyOtp(phoneNumber, verificationCode);
      if ((result.status = "approved")) {
        const userLocationData = await getUserGeolocationData();

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // save user data - register user
        const newUser = await userModel.create({
          firstName,
          lastName,
          email,
          phoneNumber,
          userLocationData,
          password: hashPassword,
        });
        res.status(200).json({
          success: true,
          message: "user registered 😍",
          registeredUser: newUser,
        });
      } else {
        sendError(res, 400, "Invalid  OTP 😲", null);
      }
    } else {
      sendError(res, 400, "Phone Number & Verification Code Required", null);
    }
  } catch (error) {
    sendError(res, 400, "failed to verifying otp", error);
  }
};
