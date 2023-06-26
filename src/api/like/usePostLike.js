import { useEffect, useState } from "react";
import getErrorMessage from "../../constant/error";
import { useApi } from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";

export const usePostLike = ({ setOpenTitleAndMessage, initBookInfoId }) => {
  const [bookInfoId, setBookInfoId] = useState(initBookInfoId);
  const { request } = useApi("post", `books/info/${bookInfoId}/like`);
  const [likeData, setLikeData] = useState({});

  const expectedItem = [
    { key: "userId", type: "number", isNullable: false },
    { key: "bookInfoId", type: "number", isNullable: false },
  ];

  const refineResponse = response => {
    const refinelikeData = compareExpect(
      `books/info/${initBookInfoId}/like`,
      [response.data],
      expectedItem,
    );
    setLikeData(...refinelikeData);
  };

  const displayError = error => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    setOpenTitleAndMessage(title, errorCode ? message : error.message);
  };

  useEffect(() => {
    if (bookInfoId) request(refineResponse, displayError);
    setBookInfoId(null);
  }, [bookInfoId]);

  return { setBookInfoId, likeData };
};
