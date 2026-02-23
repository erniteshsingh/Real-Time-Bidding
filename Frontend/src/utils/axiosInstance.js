import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // apna backend URL
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      if (error.response?.data?.isBlocked) {
        console.log(axiosInstance);
        localStorage.removeItem("token");
        window.location.href = "/login";
        alert("Your account has been blocked by admin");
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
