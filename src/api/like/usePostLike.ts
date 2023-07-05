import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";
import { AxiosResponse } from "axios";

type Props = {
  initBookInfoId?: number;
};
export const usePostLike = ({ initBookInfoId }: Props) => {
  const [bookInfoId, setBookInfoId] = useState(initBookInfoId);
  const { request } = useApi("post", `books/info/${bookInfoId}/like`);
  const [likeData, setLikeData] = useState({});

  const expectedItem = [
    { key: "userId", type: "number", isNullable: false },
    { key: "bookInfoId", type: "number", isNullable: false },
  ];

  const refineResponse = (response: AxiosResponse) => {
    const [refinelikeData] = compareExpect(
      `books/info/${initBookInfoId}/like`,
      [response.data],
      expectedItem,
    );
    setLikeData(refinelikeData);
  };

  useEffect(() => {
    if (bookInfoId) request(refineResponse,);
    setBookInfoId(undefined);
  }, [bookInfoId]);

  return { setBookInfoId, likeData };
};