import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";

export const usePostLike = (initBookInfoId?: number) => {
  const [bookInfoId, setBookInfoId] = useState(initBookInfoId);
  const { request } = useApi("post", `books/info/${bookInfoId}/like`);
  const [likeData, setLikeData] = useState({});

  const expectedItem = [
    { key: "userId", type: "number", isNullable: false },
    { key: "bookInfoId", type: "number", isNullable: false },
  ];

  const refineResponse = (response: any) => {
    const [refinelikeData] = compareExpect(
      `books/info/${initBookInfoId}/like`,
      [response.data],
      expectedItem,
    );
    setLikeData(refinelikeData);
  };
  useEffect(() => {
    if (bookInfoId) request(refineResponse);
    setBookInfoId(undefined);
  }, [bookInfoId]);

  return { setBookInfoId, likeData };
};
