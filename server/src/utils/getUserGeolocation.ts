import axios from "axios";

export const getUserGeolocationData = async () => {
  try {
    const userGeolocationInfo = await axios.get(
      `https://ipinfo.io/json?token=${process.env.IP_INFO_TOKEN || ""}`
    );
    return userGeolocationInfo;
  } catch (error) {
    throw error;
  }
};
