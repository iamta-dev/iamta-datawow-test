import axios, { type AxiosError, type AxiosResponse } from "axios";
import { getSessionAPIAccessToken } from "../actions/session.action";
import { env } from "@/env";

const backendApi = axios.create({
  baseURL: env.BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// Add a request interceptor to include the Authorization header
backendApi.interceptors.request.use(
  async (config) => {
    const session = await getSessionAPIAccessToken();

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Add a response interceptor for handling errors
backendApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Optional: Handle specific response errors globally
    return Promise.reject(error);
  },
);

export default backendApi;
