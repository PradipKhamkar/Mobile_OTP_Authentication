import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { validatePassword, validatePhoneNumber } from "../helper/validation";
import { errorToast, successToast } from "../helper/toast";
import { useAppDispatch, useAppSelector } from "../hook";
import {
  clearError,
  clearMessage,
} from "../redux/verifyAndRegisterAndAuthSlice";
import { useNavigate } from "react-router-dom";
import { dispatchLoginUser } from "../redux/verifyAndRegisterAndAuthSlice";
import { dispatchGetLoggedUser } from "../redux/getLoginUserSlice";
import { PiEyeClosedBold } from "react-icons/pi";

const Login = () => {
  const { loading, error, message, success } = useAppSelector(
    (state) => state.verifyAndRegisterAndAuth
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [isPasswordHidden, setPasswordHidden] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCounterCode] = useState("+91");

  const handelOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isPasswordValid = validatePassword(password);
    const isValidPhoneNumber = validatePhoneNumber(phoneNumber);

    if (!isPasswordValid) {
      errorToast("Password At Least 5 Character Avoid Speacial Symbol..!!");
    } else if (!isValidPhoneNumber) {
      errorToast("Invalid Phone Number 🙄");
    } else {
      dispatch(
        dispatchLoginUser({
          phoneNumber: `${countryCode}${phoneNumber}`,
          password,
        })
      );
    }
  };

  if (success && message) {
    successToast(`Login Successfully 😀`);
    dispatch(clearMessage());
    dispatch(dispatchGetLoggedUser());
    navigate("/accountinfo");
  }

  if (error && message) {
    alert(message);
    // errorToast(message);
    dispatch(clearError());
    dispatch(clearMessage());
  }

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center h-screen flex-col md:p-10">
        <div className="glass py-5 px-5 md:px-10 md:w-[28rem] justify-center items-center">
          <div className="">
            <div className="flex justify-center flex-col items-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-slate-500 mt-2 text-center text-sm">
                Login now, unlock your travel dreams!
              </p>
            </div>

            <form
              className="mt-5 flex flex-col gap-5"
              onSubmit={(e) => handelOtpSubmit(e)}
            >
              <div className="w-full mt-5 relative flex justify-center items-center h-12 bg-white  rounded-xl overflow-hidden ">
                <select
                  value={countryCode}
                  onChange={(e) => setCounterCode(e.target.value)}
                  className="py-2 px-1 outline-none border-none h-full"
                >
                  <option value="+91" selected className="">
                    +91 IN
                  </option>
                  <option value="+1">+1 US</option>
                </select>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="outline-none border-none  pl-2 w-full h-full"
                  placeholder="Phone Number"
                  // required
                />
              </div>
              <div className="w-full bg-white rounded-xl relative overflow-hidden">
                <input
                  type={isPasswordHidden ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-white outline-none border-none w-full px-5 pr-8"
                  placeholder="Password"
                  // required
                />
                <div
                  className="absolute md:left-[93%] left-[90%] top-[35%]"
                  onClick={() => setPasswordHidden(!isPasswordHidden)}
                >
                  <PiEyeClosedBold />
                </div>
              </div>
              <input
                disabled={loading}
                type="submit"
                value={loading ? "Login Wait" : "Login"}
                className="w-full bg-violet-800 h-12 rounded-lg mt-5 text-white hover:bg-red-400 cursor-pointer outline-none border-none"
              />
            </form>
            <div className="mt-5 ">
              <p className="text-sm text-slate-400 text-center">
                Don't have an account?
                <span
                  className="text-red-400 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  {" "}
                  Register
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
