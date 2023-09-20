import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { successToast } from "../helper/toast";
import { useAppDispatch, useAppSelector } from "../hook";
import { dispatchGetLoggedUser } from "../redux/getLoginUserSlice";
import {
  clearError,
  clearMessage,
  dispatchLogout,
} from "../redux/logOutUserSlice";

const AccountInfo = () => {
  const {
    loading: getLoggedUserLoading,
    success: getLoggedUserSuccess,
    message: getLoggedUserMessage,
    error: getLoggedUserError,
    userData,
  } = useAppSelector((state) => state.getLoggedUser);

  const {
    loading: logoutLoading,
    success: logOutSuccess,
    message: logoutMessage,
    error: logoutError,
  } = useAppSelector((state) => state.logOutUser);

  const dispatch = useAppDispatch();

  const handelLogout = () => {
    dispatch(dispatchLogout());
  };

  if (logoutError && logoutMessage) {
    dispatch(clearError());
    dispatch(clearMessage());
  }

  if (logOutSuccess && logoutMessage) {
    successToast(logoutMessage);
    dispatch(clearMessage());
    window.location.reload();
  }

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center md:h-screen flex-col py-5 md:p-10">
        <div className="glass py-5 md:px-10 px-5">
          <div className="">
            <div className="flex justify-center flex-col items-center">
              <h1 className="text-3xl font-bold ">
                Welcome {userData?.firstName} !
              </h1>
              <p className="text-slate-500 mt-2 text-center text-sm">
                Here is your profile info have good day
              </p>
              <img
                src={
                  userData?.profilePic !== ""
                    ? userData?.profilePic
                    : require("../assets/images/profile.png")
                }
                alt=""
                className="w-[8rem] h-[8rem] rounded-full cursor-pointer mt-5"
              />
            </div>
            {/* input  1st section start */}
            <div className="flex gap-3 md:flex-row flex-col justify-center items-center mt-5">
              <input
                type="text"
                disabled
                value={userData?.firstName}
                className="h-12 bg-white outline-none border-none rounded-xl px-5 w-full"
                placeholder="First Name"
                // required
              />
              <input
                type="text"
                disabled
                value={userData?.lastName}
                className="h-12 bg-white outline-none border-none rounded-xl px-5 w-full"
                placeholder="Last Name"
                // required
              />
              <input
                type="text"
                disabled
                value={userData?.email}
                className="h-12 bg-white outline-none border-none rounded-xl px-5 w-full"
                placeholder="Email Id"
                // required
              />
            </div>
            <div className="flex gap-3 md:flex-row flex-col justify-center items-center mt-5">
              <input
                type="text"
                disabled
                value={userData?.userLocationData?.city}
                className="h-12 bg-white outline-none border-none rounded-xl px-5 w-full"
                placeholder="City"
                // required
              />
              <input
                type="text"
                disabled
                value={userData?.userLocationData?.region}
                className="h-12 bg-white outline-none border-none rounded-xl px-5 w-full"
                placeholder="State"
                // required
              />
              <input
                type="text"
                disabled
                value={userData?.userLocationData?.country}
                className="h-12 bg-white outline-none border-none rounded-xl px-5 w-full"
                placeholder="Country"
                // required
              />
            </div>

            {/* input  2st section start */}
            <div className="flex gap-3 md:flex-row flex-col justify-center items-center mt-5">
              <input
                type="text"
                disabled
                value={userData?.userLocationData?.postal}
                className="h-12 bg-white outline-none border-none rounded-xl px-5 w-full"
                placeholder="Postal Code"
                // required
              />
              <input
                type="text"
                disabled
                value={`+${userData?.phoneNumber} `}
                className="h-12 bg-white outline-none border-none rounded-xl px-5 w-full"
                placeholder="Mobile Number"
                // required
              />
              <input
                type="text"
                disabled
                value={userData?.userLocationData?.timezone}
                className="h-12 bg-white outline-none border-none rounded-xl px-5 w-full"
                placeholder="Time Zone"
                // required
              />
            </div>

            <button
              disabled={logoutLoading}
              onClick={handelLogout}
              // value="Logout"
              className="w-full bg-violet-800 h-12 rounded-lg mt-5 text-white hover:bg-red-400 cursor-pointer outline-none border-none"
            >
              {logoutLoading ? "Loading Wait" : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
