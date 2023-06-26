import { useEffect, useState } from "react";
import getErrorMessage from "../../constant/error";
import { useApi } from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";

export const useGetLike = ({
  setOpenTitleAndMessage,
  initBookInfoId,
  setCurrentLike,
  setCurrentLikeNum,
}) => {
  const { request } = useApi("get", `books/info/${initBookInfoId}/like`);
  const [likeData, setLikeData] = useState({});

  const expectedItem = [
    { key: "bookInfoId", type: "number", isNullable: false },
    { key: "isLiked", type: "bool", isNullable: false },
    { key: "likeNum", type: "number", isNullable: false },
  ];

  const refineResponse = response => {
    const refinelikeData = compareExpect(
      `books/info/${initBookInfoId}/like`,
      [response.data],
      expectedItem,
    );
    setLikeData(...refinelikeData);
    setCurrentLike(refinelikeData[0].isLiked);
    setCurrentLikeNum(refinelikeData[0].likeNum);
  };

  const displayError = error => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    setOpenTitleAndMessage(title, errorCode ? message : error.message);
  };

  useEffect(() => {
    if (initBookInfoId) request(refineResponse, displayError);
  }, []);

  return { likeData };
};
