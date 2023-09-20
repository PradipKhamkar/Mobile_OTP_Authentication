import { configureStore } from "@reduxjs/toolkit";
import sendOtpReducer from "./sendOtpSlice";
import verifyAndRegisterReducer from "./verifyAndRegisterAndAuthSlice";
import resetOtpReducer from "./resendOtpSlice";
import getLoggedUserReducer from "./getLoginUserSlice";
import logoutUserReducer from "./logOutUserSlice";

const store = configureStore({
  reducer: {
    sendOtp: sendOtpReducer,
    verifyAndRegisterAndAuth: verifyAndRegisterReducer,
    resetOtp: resetOtpReducer,
    getLoggedUser: getLoggedUserReducer,
    logOutUser: logoutUserReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
