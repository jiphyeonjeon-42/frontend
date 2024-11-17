import axios from "axios";
import * as Sentry from "@sentry/react";

const api = axios.create({
  baseURL: `${import.meta.env.REACT_APP_API}`,
  withCredentials: true,
});

const axiosPromise = (method: string, url: string, data?: unknown) => {
  if (method === "post") return api.post(url, data);
  if (method === "put") return api.put(url, data);
  if (method === "patch") return api.patch(url, data);
  if (method === "delete") return api.delete(url, { data });
  return api.get(url, { params: data });
};

export default axiosPromise;

api.interceptors.response.use(
  response => response,
  error => {
    Sentry.captureException(error);
    throw error;
  },
);
