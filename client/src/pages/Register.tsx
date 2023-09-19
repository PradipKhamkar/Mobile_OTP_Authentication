import React, { useState } from "react";
import FormContainer from "../components/layout/FormContainer";
import { toast, ToastContainer } from "react-toastify";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../helper/validation";
import { errorToast, successToast } from "../helper/toast";
import { sendOtpApi } from "../api/userApis";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCounterCode] = useState("+91");
  const [profilePic, setProfilePic] = useState("");
  const [previewImage, setImagePreview] = useState("");

  const handelImageChange = (e: any) => {
    const reader = new FileReader();
    if (e?.target?.files[0] !== undefined) {
      reader.onload = async () => {
        if (reader.readyState === 2) {
          setProfilePic(reader.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setImagePreview(window.URL.createObjectURL(e.target.files[0]));
    }
  };

  const handelOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFirstNameValid = validateName(firstName);
    const isLastNameValid = validateName(lastName);
    const isPasswordValid = validatePassword(password);
    const isValidEmail = validateEmail(email);
    if (!isFirstNameValid) {
      errorToast("Invalid First Name 🙄");
    } else if (!isLastNameValid) {
      errorToast("Invalid Last Name 🙄");
    } else if (!isValidEmail) {
      errorToast("Invalid Email ID 🙄");
    } else if (!isPasswordValid) {
      errorToast("Invalid Password 🙄");
    } else {
      successToast("Valid data 😍");
      const a = await sendOtpApi(`${countryCode}${phoneNumber}`, email);
      console.log(a);
    }
  };

  return (
    <>
      <ToastContainer />
      <FormContainer>
        <div className="">
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-3xl font-bold ">Wander Wave</h1>
            <p className="text-slate-500 mt-2 text-center text-sm">
              Register now, unlock your travel dreams!
            </p>
          </div>
          <div className=" flex flex-col justify-center items-center pt-5">
            <label htmlFor="profilePic">
              <img
                src={previewImage || require("../assets/images/profile.png")}
                alt=""
                className="w-[8rem] h-[8rem] rounded-full cursor-pointer"
              />
            </label>
            <input
              type="file"
              id="profilePic"
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => handelImageChange(e)}
            />
          </div>
          <form className="mt-5" onSubmit={(e) => handelOtpSubmit(e)}>
            <div className="flex justify-center gap-5 items-center">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-12 bg-white outline-none border-none rounded-xl px-5 w-full"
                placeholder="First Name"
                // required
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-12 bg-white outline-none border-none rounded-xl px-5 w-full"
                placeholder="Last Name"
                // required
              />
            </div>
            <div className="flex justify-center gap-5 items-center mt-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white outline-none border-none rounded-xl px-5 w-full"
                placeholder="Email Id"

                // required
              />

              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-white outline-none border-none rounded-xl px-5 w-full"
                placeholder="Password"
                // required
              />
            </div>
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
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="outline-none border-none  pl-2 w-full h-full"
                placeholder="Phone Number"
                // required
              />
            </div>
            <input
              type="submit"
              value="Sent OTP"
              className="w-full bg-violet-800 h-12 rounded-lg mt-5 text-white hover:bg-red-400 cursor-pointer outline-none border-none"
            />
          </form>
        </div>
      </FormContainer>
    </>
  );
};

export default Register;
