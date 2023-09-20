import jwt from "jsonwebtoken";

export const createOtpToken = async (payload: string) => {
  const token = jwt.sign({ phoneNumber: payload }, process.env.JWT_KEY || "", {
    expiresIn: "5m",
  });
  return token;
};

export const createLoginToken = async (payload: any) => {
  const token = jwt.sign({ userId: payload }, process.env.JWT_KEY || "", {
    expiresIn: "2h",
  });
  return token;
};
