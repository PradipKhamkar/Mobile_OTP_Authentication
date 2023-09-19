import axios from "axios";

export const sendOtpApi = async (phoneNumber: string, email: string) => {
  try {
    const { data } = await axios.post(
      `http://localhost:8000/api/user/register/sendotp?${phoneNumber}`,
      {
        email,
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};
