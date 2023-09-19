import React, { useState, useEffect } from "react";
import FormContainer from "../components/layout/FormContainer";

const VerifyOtp = () => {
  const [time, setTime] = useState(34);
  const [nextOtpCount, setNextOtpCount] = useState(true);

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

  return (
    <FormContainer>
      <div className=" flex h-full justify-center items-center flex-col gap-5">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">OTP Verification</h1>
          <p className="text-slate-500 mt-2 text-center text-sm">
            Just one step to start your journey!
          </p>
        </div>
        <form className="mt-5 flex flex-col justify-center items-center">
          <p className="mb-2 text-sm text-slate-400 ">
            Enter 6 digit OTP sent your mobile number
          </p>
          <input
            type="number"
            placeholder="OTP"
            className="w-full bg-white  h-12 rounded-lg  text-black  pl-3 cursor-pointer outline-none border-none"
          />
          <input
            type="submit"
            value="Start Journey"
            className="w-full bg-violet-800 h-12 rounded-lg mt-5 text-white hover:bg-red-400 cursor-pointer outline-none border-none"
          />
          <div className="mt-5">
            <p className="text-sm text-slate-400">
              Can't get OTP?{" "}
              {nextOtpCount ? (
                <span className="text-red-400">{`Wait ${time} Sec`}</span>
              ) : (
                <span className="text-red-400 cursor-pointer">Resent</span>
              )}
            </p>
          </div>
        </form>
      </div>
    </FormContainer>
  );
};

export default VerifyOtp;
