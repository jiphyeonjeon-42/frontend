import { useSearchParams } from "react-router-dom";

const useParseUrlQueryString = keys => {
  const [urlSearchParams] = useSearchParams();
  if (typeof keys.map === "function")
    return keys.map(key => urlSearchParams.get(key));
  return [];
};

export default useParseUrlQueryString;
