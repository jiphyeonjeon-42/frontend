import { useSearchParams } from "react-router-dom";

export const useParseUrlQueryString = keys => {
  const [urlSearchParams] = useSearchParams();
  if (typeof keys.map === "function")
    return keys.map(key => urlSearchParams.get(key));
  return [];
};
