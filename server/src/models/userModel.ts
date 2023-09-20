import mongoose, { Schema, model, Model } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  userLocationData: object;
  profilePic: string;
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, "please enter firstName"],
    trim: true,
  },
  lastName: { type: String, required: [true, "please enter lastName"] },
  phoneNumber: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "please enter phone number"],
  },
  profilePic: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "please enter email"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
  },
  userLocationData: { type: Object },
});

const userModel = model<IUser>("otpUser", userSchema);

export default userModel;
