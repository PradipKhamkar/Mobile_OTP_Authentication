import { Response } from "express";

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  error: any
) => {
  res.status(statusCode).json({
    message,
    error,
  });
};
