import { useEffect, useState } from "react";
import getErrorMessage from "../../constant/error";
import useApi from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";

type Props = {
  setOpenTitleAndMessage: (title: string, message: string) => void;
  initBookInfoId?: number;
};

const usePostLike = ({ setOpenTitleAndMessage, initBookInfoId }: Props) => {
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

  const displayError = (error: any) => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    setOpenTitleAndMessage(title, errorCode ? message : error.message);
  };

  useEffect(() => {
    if (bookInfoId) request(refineResponse, displayError);
    setBookInfoId(undefined);
  }, [bookInfoId]);

  return { setBookInfoId, likeData };
};

export default usePostLike;
