import { api } from "./api";
import { refreshToken, userAuth } from "../../const/localStorage";
import axios from "axios";
import { BASE_URL } from "../../const/url";
import { persistor } from "../../utils/store";
import { Navigate } from "react-router-dom";

export const clearUser = async () => {
  localStorage.removeItem(userAuth);
  localStorage.removeItem(refreshToken);
  // Clearing the store, if applicable
  // persistor.purge();
  window.location.href = "/login";
};

export const apiCall = async (method, url, data) => {
  return await new Promise(async (resolve, reject) => {
    try {
      const source = axios.CancelToken.source();

      let response = await api({
        method: method,
        url: url,
        data: data,
        cancelToken: source.token,
      });

      resolve(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        reject(error);
      }
    }
  });
};

export const cancelRequest = (source) => {
  source.cancel("Request canceled by the user");
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
