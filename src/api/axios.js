import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://task-management-backend-041c.onrender.com/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
