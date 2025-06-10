import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://api.sharwings.in/api",
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;
