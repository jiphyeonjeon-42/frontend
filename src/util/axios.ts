import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.REACT_APP_API}`,
  withCredentials: true,
});

export const axiosPromise = (method: string, url: string, data?: unknown) => {
  if (method === "post") return api.post(url, data);
  if (method === "put") return api.put(url, data);
  if (method === "patch") return api.patch(url, data);
  if (method === "delete") return api.delete(url);
  return api.get(url, { params: data });
};
