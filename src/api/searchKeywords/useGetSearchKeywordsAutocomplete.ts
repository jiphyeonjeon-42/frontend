import { useDeferredValue, useEffect, useState } from "react";
import { useApi } from "~/hook/useApi";
import { useDebounce } from "~/hook/useDebounce";
import { type BookPreviewType } from "~/type";

export const useGetSearchKeywordsAutocomplete = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const defferedKeyword = useDeferredValue(keyword);
  const [data, setData] = useState<{
    books: BookPreviewType[];
    totalCount: number;
  }>({
    books: [],
    totalCount: 0,
  });

  const { requestWithUrl } = useApi();
  const debounce = useDebounce();

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      requestWithUrl("get", "/search-keywords/autocomplete", {
        data: { keyword },
        onSuccess: (response: any) => {
          setData({
            books: response.data.items,
            totalCount: response.data.meta.totalCount,
          });
          setIsLoading(false);
        },
      });
    }, 300);
  }, [defferedKeyword]);
  return { ...data, keyword, setKeyword, isLoading };
};
