import { api } from "./api";
import { refreshToken, userAuth } from "../../const/localStorage";
import axios from "axios";
import { BASE_URL } from "../../const/url";
import { persistor } from "../../utils/store";
import { Navigate } from "react-router-dom";

export const createCancelToken = () => {
  return axios.CancelToken.source();
};

export const clearUser = async () => {
  localStorage.removeItem("userAuth");
  localStorage.removeItem("refreshToken");
  persistor.purge();
  localStorage.clear()
  window.location.href = "/login";
};

export const apiCall = async (method, url, data, cancelToken) => {
  return await new Promise(async (resolve, reject) => {
    try {
      let response, error;

      if (method === "post") {
        response = await api.post(url, data, { cancelToken }).catch((err) => {
          error = err;
        });
      } else if (method === "get") {
        response = await api.get(url, { ...data, cancelToken }).catch((err) => {
          error = err;
        });
      } else if (method === "patch") {
        response = await api.patch(url, data, { cancelToken }).catch((err) => {
          error = err;
        });
      } else if (method === "delete") {
        response = await api.delete(url, { ...data, cancelToken }).catch((err) => {
          error = err;
        });
      } else if (method === "put") {
        response = await api.put(url, data, { cancelToken }).catch((err) => {
          error = err;
        });
      }

      if (response) {
        resolve(response.data);
      } else if (error) {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 422
        ) {
          if (
            error?.response?.data?.error_code === "FORBIDDEN_LOGIN" ||
            "Unauthorized_verify"
          ) {
            // clearUser()
            reject(error.response.data);
          }
        } else if (error?.response?.status === 401) {
          refreshAccessToken(error)
            .then((response) => {
              if (response?.success) {
                resolve(response?.success?.data);
              } else {
                reject(response?.failed?.response?.data);
              }
            })
            .catch((error) => {
              clearUser();
            });
        }

        reject(error?.response?.data);
      }
    } catch (err) {
      reject(err);
    }
  });
};

const refreshAccessToken = async (error) => {
  try {
    if (error.response?.status === 401) {
      const tokenRefresh = localStorage.getItem(refreshToken);

      if (tokenRefresh) {
        error.config._retry = true;

        return new Promise(async (resolve, reject) => {
          try {
            // refreshing the access token
            const response = await axios
              .post(`${BASE_URL}/api/auth/user/refresh-token`, null, {
                headers: {
                  Authorization: tokenRefresh,
                },
              })
              .catch((err) => {
                reject(err);
              });

            if (response) {
              const newAccessToken = response.data.newToken;
              localStorage.setItem(userAuth, newAccessToken);

              // calling the original request
              error.config.headers["Authorization"] = newAccessToken;

              axios(error.config)
                .then((response) => {
                  window.location.reload();
                  resolve({ success: response });
                })
                .catch((error) => {
                  resolve({ failed: error });
                });
            }
          } catch (refreshError) {
            reject(refreshError);
          }
        });
      } else {
        clearUser();
      }
    }
  } catch (error) {
    clearUser();
  }
};
