import { useApi } from "../../hook/useApi";

export const usePostAuthLogout = () => {
  return useApi("post", "auth/logout").request;
};
