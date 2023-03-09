import axios from "axios";

const isDevelopment = process.env.NODE_ENV;
let BASE_URL = "";
if (isDevelopment) {
  BASE_URL = "http://localhost:3535";
} else {
  BASE_URL = "http://localhost:3535";
}

const axiosBaseUrl = axios.create({
  baseURL: BASE_URL,
});

export default axiosBaseUrl;
