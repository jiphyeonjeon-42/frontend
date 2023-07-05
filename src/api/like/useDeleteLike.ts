import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";

type Props = {
  initBookInfoId?: number;
};
export const useDeleteLike = ({ initBookInfoId }: Props) => {
  const [bookInfoId, setBookInfoId] = useState(initBookInfoId);
  const { request } = useApi("delete", `books/info/${bookInfoId}/like`);
  const [likeData, setLikeData] = useState({});

  const expectedItem = [
    { key: "bookInfoId", type: "number", isNullable: false },
    { key: "isLiked", type: "bool", isNullable: false },
    { key: "likeNum", type: "number", isNullable: false },
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
