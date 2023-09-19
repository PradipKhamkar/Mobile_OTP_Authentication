import mongoose, { Schema, model, Model } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  userLocationData: object;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: [true, "please enter firstName"] },
  lastName: { type: String, required: [true, "please enter lastName"] },
  phoneNumber: {
    type: String,
    unique: true,
    required: [true, "please enter phone number"],
  },
  email: { type: String, unique: true, required: [true, "please enter email"] },
  password: { type: String, required: [true, "please enter password"] },
  userLocationData: { type: Object },
});

const userModel = model<IUser>("otpUser", userSchema);

export default userModel;
