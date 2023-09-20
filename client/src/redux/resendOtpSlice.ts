import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { resentOtpApi, sendOtpApi } from "../api/userApis";
import { IUserRegister } from "../interfaces/register";

interface IResentOtpSliceInterface {
  loading?: boolean;
  success?: boolean;
  error?: any;
  message?: any;
}

const initialState: IResentOtpSliceInterface = {};

export const resendOtpSlice = createSlice({
  name: "resentOTP",
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
  resendOtpSlice.actions;
export default resendOtpSlice.reducer;
export { clearError, clearMessage };

export const dispatchResendOtp = () => async (dispatch: Dispatch) => {
  try {
    const userData: any = localStorage.getItem("userRegisterData");
    if (userData !== null) {
      dispatch(setLoading());
      const response = await resentOtpApi(JSON.parse(userData));
      dispatch(setSuccess(response));
    } else {
      const error = {
        error: true,
        message: "User Data Not Exit In Storage..!!",
      };
      dispatch(setFailed(error));
    }
  } catch (error) {
    setFailed(dispatch(setFailed(error)));
  }
};
