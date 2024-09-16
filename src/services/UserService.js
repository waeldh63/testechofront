import axios from "axios";
import config from "../config";
import { jwtDecode } from "jwt-decode";

async function userLogin(email, password) {
  try {
    const response = await axios.post(config + "/userLogin", {
      email,
      password,
    });
    const token = response.data.user;

    // setCookie("token", token, 1);
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Login error:", error);
  }
}

const signUp = async (name, email, password) => {
  try {
    const response = await axios.post(config + "/createUser", {
      name,
      email,
      password,
    });

    return response.data.user;
  } catch (error) {
    console.error("Error details:", error);
    throw error;
  }
};

const userServices = {
  userLogin,
  signUp,
};
export default userServices;
