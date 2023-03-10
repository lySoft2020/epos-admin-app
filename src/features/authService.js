import axiosBaseUrl from "../apis/connection";

const API_URL = "/api/users/";
const userKey = "user";

// Register User
export const register = async (userData) => {
  try {
    const response = await axiosBaseUrl.post(API_URL, userData);

    //When they register the account is pending so we don't store to the local storage
    // if (response.data) {
    //   localStorage.setItem(userKey, JSON.stringify(response.data));
    // }

    return response.data;
  } catch (error) {
    return error;
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await axiosBaseUrl.post(API_URL + "login", userData);

    console.log("login response", response.data);
    if (response.data) {
      localStorage.setItem(userKey, JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

// get current user
export function getCurrentUser() {
  try {
    return localStorage.getItem(userKey);
  } catch (ex) {
    return null;
  }
}

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
