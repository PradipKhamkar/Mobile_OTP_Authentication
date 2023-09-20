import { createSlice, Dispatch } from "@reduxjs/toolkit";
import {
  getLoggedUserApi,
  logOutUserApi,
  sendOtpApi,
  userLoginApi,
  verifyAndRegisterApi,
} from "../api/userApis";
import { ILoginUserInterface, IUserRegister } from "../interfaces/register";

interface IVerifyAndRegisterSliceInterface {
  loading?: boolean;
  success?: boolean;
  error?: any;
  message?: any;
  userData?: object;
}

const initialState: IVerifyAndRegisterSliceInterface = {};

export const verifyAndRegisterSlice = createSlice({
  name: "OTPVerification",
  initialState,
  reducers: {
    setLoading(state) {
      return {
        loading: true,
      };
    },
    setSuccess(state, action) {
      return {
        ...state,
        success: true,
        loading: false,
        message: action.payload.message,
        userData: action.payload.userData,
      };
    },
    setFailed(state, action) {
      return {
        loading: false,
        error: action.payload.error,
        message: action.payload.message,
      };
    },
    clearError(state) {
      return {
        ...state,
        error: false,
      };
    },
    clearMessage(state) {
      return {
        ...state,
        message: false,
      };
    },
  },
});

const { setLoading, setSuccess, setFailed, clearError, clearMessage } =
  verifyAndRegisterSlice.actions;
export default verifyAndRegisterSlice.reducer;
export { clearError, clearMessage };

export const dispatchVerifyAnRegister =
  (verificationCode: any) => async (dispatch: Dispatch) => {
    try {
      const userData: any = localStorage.getItem("userRegisterData");
      dispatch(setLoading());
      const response = await verifyAndRegisterApi(
        JSON.parse(userData),
        verificationCode
      );
      dispatch(setSuccess(response));
      localStorage.removeItem("userRegisterData");
    } catch (error: any) {
      console.log("error", error);
      dispatch(setFailed(error));
    }
  };

export const dispatchLoginUser =
  (userData: ILoginUserInterface) => async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading());
      const response = await userLoginApi(userData);
      dispatch(setSuccess(response));
    } catch (error: any) {
      console.log("error", error);
      dispatch(setFailed(error));
    }
  };
