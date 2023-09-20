import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { sendOtpApi } from "../api/userApis";
import { IUserRegister } from "../interfaces/register";

interface ISendOtpSliceInterface {
  loading?: boolean;
  success?: boolean;
  error?: any;
  message?: any;
}

const initialState: ISendOtpSliceInterface = {};

export const sendOtpSlice = createSlice({
  name: "sendOtp",
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
  sendOtpSlice.actions;
export default sendOtpSlice.reducer;
export { clearError, clearMessage };

export const dispatchSentOtp =
  (userData: IUserRegister) => async (dispatch: Dispatch) => {
    try {
      const { phoneNumber, email } = userData;
      dispatch(setLoading());
      const response = await sendOtpApi(phoneNumber, email);
      localStorage.setItem("userRegisterData", JSON.stringify(userData));
      dispatch(setSuccess(response));
    } catch (error) {
      setFailed(dispatch(setFailed(error)));
    }
  };
