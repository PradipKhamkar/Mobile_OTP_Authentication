import { Request, RequestHandler, Response } from "express";
import twilio from "twilio";

export const sentOtp: RequestHandler = async (req: Request, res: Response) => {
  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_ACCOUNT_TOKEN
    );
    const response = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_ID || "")
      .verifications.create({
        to: "+917350403908",
        channel: "sms",
      });
    console.log(response);

    res.status(200).json({
      success: true,
      // message: `Otp sent to ${mobileNumber}`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `failed to sent otp`,
    });
  }
};
