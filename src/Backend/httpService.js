import axios from "axios";
import { getCookie } from "./Aurh";

axios.defaults.baseURL = "http://localhost:4000";

axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie("token")}`;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging error", error);
    alert("An unexpected Error occurred");
  }

  return Promise.reject(error);
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
