import axios from "axios";
import { adminAuth, userAuth } from "../../const/localStorage";
import { BASE_URL } from "../../const/url";

export const adminApi = axios.create({
  baseURL: `${BASE_URL}`,
});

adminApi.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = localStorage.getItem(userAuth);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
