import { useEffect, useState } from "react";
import { useApi } from "~/hook/useApi";
import type { BookInfoRecommend } from "~/type";

export const useGetCursusRecommendBooks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>();
  const [recommend, setRecommend] = useState<Recommend>({
    books: [],
    options: ["사용자 지정"],
  });
  const { requestWithUrl } = useApi();
  useEffect(() => {
    setIsLoading(true);
    const saveRecommend = (response: any) => {
      const { items, meta } = response.data;
      meta.sort();
      setRecommend({
        books: items,
        options: [
          "사용자 지정",
          ...meta.filter((item: string) => item !== "사용자 지정"),
        ],
      });
      setIsLoading(false);
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

  return { ...recommend, setSelectedOption, isLoading };
};

type Recommend = {
  books: BookInfoRecommend[];
  options: string[];
};
