import { useEffect, useState } from "react";
import { useApi } from "~/hook/useApi";
import { SearchKeyword } from "~/type/SearchKeyword";

export const useGetSearchKeyword = () => {
  const [keywords, setKeywords] = useState<(SearchKeyword & { id: number })[]>(
    [],
  );
  const { requestWithUrl } = useApi();

  useEffect(() => {
    const saveKeywordsWithKey = (response: any) => {
      const keywords = response.data.items as SearchKeyword[];
      setKeywords(
        keywords.map((keyword, index) => ({
          ...keyword,
          id: index,
        })),
      );
    };

    requestWithUrl("get", "/search-keywords/popular", {
      onSuccess: saveKeywordsWithKey,
    });
  }, []);

  return { keywords };
};
