import axios from "axios";
import { ILoginUserInterface, IUserRegister } from "../interfaces/register";

export const sendOtpApi = async (phoneNumber: string, email: string) => {
  try {
    const { data } = await axios.post(
      `/api/user/register/sendotp?phoneNumber=${phoneNumber}`,
      {
        email,
      }
    );
    return data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const verifyAndRegisterApi = async (
  userData: IUserRegister,
  verificationCode: number
) => {
  try {
    const { phoneNumber } = userData;
    const { data } = await axios.post(
      `/api/user/verify/register?phoneNumber=${phoneNumber}&verificationCode=${verificationCode}`,
      userData
    );
    return data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const resentOtpApi = async (userData: IUserRegister) => {
  try {
    const { phoneNumber } = userData;
    const { data } = await axios.post(
      `/api/user/resentotp?phoneNumber=${phoneNumber}`,
      userData
    );
    return data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const userLoginApi = async (userData: ILoginUserInterface) => {
  try {
    const { data } = await axios.post(`/api/user/login`, userData);
    return data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const getLoggedUserApi = async () => {
  try {
    const { data } = await axios.get(`/api/user/getloggeduser`);
    return data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const logOutUserApi = async () => {
  try {
    const { data } = await axios.get(`/api/user/logout`);
    return data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
