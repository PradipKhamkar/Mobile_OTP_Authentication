import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { getLoggedUserApi } from "../api/userApis";
import { IUserRegister } from "../interfaces/register";

interface IGetLoggedUserInterface {
  loading?: boolean;
  success?: boolean;
  error?: any;
  message?: any;
  userData?: IUserRegister;
}

const initialState: IGetLoggedUserInterface = {};

const getLoggedUser = createSlice({
  name: "getLoggedUser",
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
        userData: action.payload.userData,
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
  getLoggedUser.actions;
export default getLoggedUser.reducer;
export { clearError, clearMessage };

export const dispatchGetLoggedUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading());
    const response = await getLoggedUserApi();
    dispatch(setSuccess(response));
  } catch (error) {
    setFailed(dispatch(setFailed(error)));
  }
};
