import axios from "axios";
import { NEXT_PUBLIC_API_BASE_URL } from "./config";
import { getSession, signOut } from "next-auth/react";

const Axios = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
  timeout: 30000, // 30 seconds
});

Axios.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
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
    if (error?.response?.status === 403 || error?.response?.status === 401) {
      await signOut();
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default Axios;
