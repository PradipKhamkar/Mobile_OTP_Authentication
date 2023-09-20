import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { logOutUserApi } from "../api/userApis";
import { ILoginUserInterface } from "../interfaces/register";

interface ILogoutSliceInterface {
  loading?: boolean;
  success?: boolean;
  error?: any;
  message?: any;
  userData?: object;
}

const initialState: ILogoutSliceInterface = {};

export const logoutSlice = createSlice({
  name: "logout",
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
  logoutSlice.actions;
export default logoutSlice.reducer;
export { clearError, clearMessage };

export const dispatchLogout = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading());
    const response = await logOutUserApi();
    console.log("logout", response);
    dispatch(setSuccess(response));
  } catch (error) {
    setFailed(dispatch(setFailed(error)));
  }
};
