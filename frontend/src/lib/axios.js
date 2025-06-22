import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://www.sharwings.in/api",
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;
