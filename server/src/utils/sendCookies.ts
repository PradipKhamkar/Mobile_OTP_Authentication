import { Response } from "express";

export const sendOtpCookie = (
  res: Response,
  token: string,
  phoneNumber: string
) => {
  const expiration = new Date(new Date().getTime() + 5 * 60 * 1000);
  res.cookie("otpToken", token, {
    expires: expiration,
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: `Otp send to ${phoneNumber}`,
  });
};

export const sendLoginCookie = (res: Response, token: string) => {
  const expiration = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); // 2 hours in milliseconds
  res.cookie("jwtAutToken", token, {
    expires: expiration,
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: `Logged In Successfully 😎 `,
  });
};
