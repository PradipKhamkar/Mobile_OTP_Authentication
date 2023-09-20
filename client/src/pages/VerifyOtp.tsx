import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FormContainer from "../components/layout/FormContainer";
import { errorToast, successToast } from "../helper/toast";
import { useAppDispatch, useAppSelector } from "../hook";
import { dispatchGetLoggedUser } from "../redux/getLoginUserSlice";
import {
  clearError as resentOtpClearError,
  clearMessage as resetOtpClearMessage,
  dispatchResendOtp,
} from "../redux/resendOtpSlice";
import {
  clearError as verifyAndRegisterClearError,
  clearMessage as verifyAndRegisterClearMessage,
  dispatchVerifyAnRegister,
} from "../redux/verifyAndRegisterAndAuthSlice";

const VerifyOtp = () => {
  const location = useLocation();

  const {
    loading: verifyRegisterLoading,
    success: verifyRegisterSuccess,
    message: verifyRegisterMessage,
    error: VerifyRegisterError,
  } = useAppSelector((state) => state.verifyAndRegisterAndAuth);

  const {
    loading: resendOTPLoading,
    success: resendOTPSuccess,
    message: resendOTPMessage,
    error: resendOTPError,
  } = useAppSelector((state) => state.resetOtp);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [time, setTime] = useState(34);
  const [nextOtpCount, setNextOtpCount] = useState(true);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    let interval: any;
    if (nextOtpCount) {
      interval = setInterval(() => {
        if (time > 0) {
          setTime(time - 1);
        } else {
          clearInterval(interval);
          setNextOtpCount(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [time, nextOtpCount]);

  const startCountdown = () => {
    setTime(34); // Reset the countdown to 34 seconds
    setNextOtpCount(true);
  };

  const handelOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputText = e.target.value;
    if (inputText.length > 4) {
      inputText = inputText.slice(0, 4);
      errorToast("OTP Has Only 4 Digit");
    }
    setOtp(inputText);
  };

  const handelOtpVerification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp?.trim()?.length === 4) {
      dispatch(dispatchVerifyAnRegister(otp));
    } else {
      errorToast("Invalid OTP..!!");
    }
  };

  if (verifyRegisterMessage && VerifyRegisterError) {
    errorToast(verifyRegisterMessage);
    dispatch(verifyAndRegisterClearMessage());
    dispatch(verifyAndRegisterClearError());
  }

  if (verifyRegisterSuccess && verifyRegisterMessage) {
    successToast(verifyRegisterMessage);
    dispatch(verifyAndRegisterClearMessage());
    dispatch(dispatchGetLoggedUser());
    navigate("/accountinfo");
  }

  const handelResendOtp = () => {
    dispatch(dispatchResendOtp());
  };

  if (resendOTPMessage && resendOTPError) {
    errorToast(resendOTPMessage);
    dispatch(resetOtpClearMessage());
    dispatch(resentOtpClearError());
  }

  if (resendOTPSuccess && resendOTPMessage) {
    successToast(resendOTPMessage);
    dispatch(resetOtpClearMessage());
    startCountdown();
  }

  useEffect(() => {
    if (location.state?.otpStatus !== true) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <FormContainer>
        <div className=" flex h-full justify-center items-center flex-col gap-5">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">OTP Verification</h1>
            <p className="text-slate-500 mt-2 text-center text-sm">
              Just one step to start your journey!
            </p>
          </div>
          <form
            className="mt-5 flex flex-col justify-center items-center"
            onSubmit={(e) => handelOtpVerification(e)}
          >
            <p className="mb-2 text-sm text-slate-400 ">
              Enter 4 digit OTP sent your mobile number
            </p>
            <input
              type="number"
              value={otp}
              onChange={(e) => handelOtpChange(e)}
              placeholder="OTP"
              className="w-full bg-white  h-12 rounded-lg  text-black  pl-3 cursor-pointer outline-none border-none"
            />
            <input
              type="submit"
              disabled={verifyRegisterLoading || resendOTPLoading}
              value={
                verifyRegisterLoading
                  ? "Verifying OTP Wait"
                  : resendOTPLoading
                  ? "Resending OTP Wait"
                  : "Start Journey"
              }
              className="w-full bg-violet-800 h-12 rounded-lg mt-5 text-white hover:bg-red-400 cursor-pointer outline-none border-none"
            />
            <div className="mt-5">
              <p className="text-sm text-slate-400">
                Can't get OTP?{" "}
                {nextOtpCount ? (
                  <span className="text-red-400">{`Wait ${time} Sec`}</span>
                ) : (
                  <span
                    className="text-red-400 cursor-pointer"
                    onClick={handelResendOtp}
                  >
                    Resent
                  </span>
                )}
              </p>
            </div>
          </form>
        </div>
      </FormContainer>
    </>
  );
};

export default VerifyOtp;
