import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.VITE_MODE === "development" ? "http://localhost:5000/api" : import.meta.VITE_BACKEND_URL,
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;
