import axios from "axios";
import { NEXT_PUBLIC_API_BASE_URL } from "./config";

const refreshAccessToken = () => {
  return axios.post(
    `/api/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );
};

const clearTokensAndRedirectToLogin = () => {
  // Remove Tokens
  localStorage.removeItem("accessToken");
  document.cookie =
    "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/login";
};

const Axios = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
  timeout: 5000,
});

Axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error?.response?.status === 403) {
      clearTokensAndRedirectToLogin();
      return Promise.reject(error);
    }
    const originalRequest = error.config;

    if (
      originalRequest &&
      error?.response?.status === 401 &&
      !originalRequest?.__isRetryRequest
    ) {
      try {
        const response = await refreshAccessToken();
        const newAccessToken = response.data.data.accessToken;

        // Store new access token in localStorage
        localStorage.setItem("accessToken", newAccessToken);

        // Update Axios default headers
        Axios.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;

        originalRequest.__isRetryRequest = true;
        return Axios(originalRequest);
      } catch (refreshError) {
        clearTokensAndRedirectToLogin();
      }
    }
    if (error?.response?.status === 401) clearTokensAndRedirectToLogin();
    return Promise.reject(error);
  }
);

export default Axios;
