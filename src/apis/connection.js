import axios from "axios";

// const isDevelopment = process.env.NODE_ENV;
console.log("is development", process.env);
let BASE_URL = "";
if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:3535";
} else {
  BASE_URL = "https://eposinfinity.cyclic.app";
}

console.log("Base url", BASE_URL);

const axiosBaseUrl = axios.create({
  baseURL: BASE_URL,
});

export default axiosBaseUrl;
