import axios from "axios";
import { adminAuth, adminRefresh } from "../../const/localStorage";
import { adminApi } from "./api";
import { BASE_URL } from "../../const/url";

const adminApiCalls = async (method, url, data, cancelTokenSource) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response, error;

      if (method === "post") {
        response = await adminApi.post(url, data, { cancelToken: cancelTokenSource.token }).catch((err) => {
          error = err;
        });
      } else if (method === "get") {
        response = await adminApi.get(url, { params: data, cancelToken: cancelTokenSource.token }).catch((err) => {
          error = err;
        });
      } else if (method === "patch") {
        response = await adminApi.patch(url, data, { cancelToken: cancelTokenSource.token }).catch((err) => {
          error = err;
        });
      } else if (method === "delete") {
        response = await adminApi.delete(url, { data, cancelToken: cancelTokenSource.token }).catch((err) => {
          error = err;
        });
      }

      if (response) {
        resolve(response.data);
      } else if (error) {
        if (error.response?.status === 401) {
          refreshAccessToken(error)
            .then((response) => {
              resolve(response.data);
            })
            .catch((error) => {
              if (error?.response?.status === 401) {
                clearAdmin();
              } else {
                reject(error);
              }
            });
        } else {
          reject(error?.response?.data);
        }
      }
    } catch (err) {
      reject(err);
    }
  });
};

const refreshAccessToken = async (error) => {
  try {
    if (error.response?.status === 401) {
      const tokenRefresh = localStorage.getItem(adminRefresh);

      if (tokenRefresh) {
        error.config._retry = true;

        return new Promise(async (resolve, reject) => {
          try {
            //refreshing the access token
            const response = await axios
              .post(`${BASE_URL}/api/auth/admin/refresh-token`, null, {
                headers: {
                  Authorization: tokenRefresh,
                },
              }, { cancelToken: error.config.cancelToken })
              .catch((err) => {
                reject(err);
              });
            if (response) {
              const newAccessToken = response.data.newToken;
              localStorage.setItem(adminAuth, newAccessToken);

              //calling the original request
              error.config.headers["Authorization"] = newAccessToken;

              axios(error.config)
                .then((response) => {
                  resolve(response);
                })
                .catch((error) => {
                  reject(error);
                });
            }
          } catch (refreshError) {
            clearAdmin();
          }
        });
      } else {
        // No refresh token available
        clearAdmin();
      }
    }
  } catch (error) {
    clearAdmin();
  }
};

export const clearAdmin = () => {
  localStorage.removeItem(adminAuth);
  localStorage.removeItem(adminRefresh);
  window.location.reload("/admin/login");
};

export default adminApiCalls;
