import { useApi } from "../../hook/useApi";

const usePostAuthLogout = () => {
  return useApi("post", "auth/logout").request;
};

export default usePostAuthLogout;
