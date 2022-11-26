import { useEffect, useState } from "react";
import getErrorMessage from "../../data/error";
import useApi from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";

const usePostLike = ({ setOpenTitleAndMessage, initBookInfoId }) => {
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

  // bookInfoId가 있을 경우만 api 요청
  useEffect(() => {
    if (bookInfoId) request(refineResponse, displayError);
  }, [bookInfoId]);

  return { setBookInfoId, likeData };
};

export default usePostLike;
