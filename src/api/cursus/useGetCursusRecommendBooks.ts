import { useEffect, useState } from "react";
import { useApi } from "~/hook/useApi";
import type { BookInfoRecommend } from "~/type";

export const useGetCursusRecommendBooks = () => {
  const [selectedOption, setSelectedOption] = useState<string>();
  const [recommend, setRecommend] = useState<Recommend>({
    books: [],
    options: [],
  });
  const { requestWithUrl } = useApi();
  useEffect(() => {
    const saveRecommend = (response: any) => {
      const { items, meta } = response.data;
      setRecommend({
        books: items,
        options: meta,
      });
    };
    requestWithUrl("get", "/cursus/recommend/books", {
      data: {
        project: selectedOption
          ? selectedOption.split("| ")[1] ?? undefined
          : undefined,
      },
      onSuccess: saveRecommend,
    });
  }, [selectedOption]);

  return { ...recommend, setSelectedOption };
};

type Recommend = {
  books: BookInfoRecommend[];
  options: string[];
};
