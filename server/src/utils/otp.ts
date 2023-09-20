import twilio from "twilio";

// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_ACCOUNT_TOKEN
// );

const client = twilio(
  "AC38bf9d0afce16c5b7a32f07b7503de01",
  "f1b9e38ba4ac2b39e2ace7afeb078671"
);

export const sendOtpCode = async (phoneNumber: string) => {
  try {
    const response = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_ID || "")
      .verifications.create({
        to: `+${phoneNumber}`,
        channel: "sms",
      });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const verifyOtp = async (
  phoneNumber: string,
  code: string | undefined
) => {
  try {
    const response = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_ID || "")
      .verificationChecks.create({
        to: `+${phoneNumber}`,
        code,
      });
    return response;
  } catch (error) {
    console.log("errtrigger", error);
    throw error;
  }
};
