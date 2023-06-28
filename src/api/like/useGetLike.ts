import { useEffect, useState } from "react";
import getErrorMessage from "../../constant/error";
import useApi from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";

type Props = {
  initBookInfoId: number;
  setCurrentLike: (isLiked: boolean) => void;
  setCurrentLikeNum?: (likeNum: number) => void;
  setOpenTitleAndMessage: (title: string, message: string) => void;
};

export const useGetLike = ({
  initBookInfoId,
  setCurrentLike,
  setCurrentLikeNum,
  setOpenTitleAndMessage,
}: Props) => {
  const { request } = useApi("get", `books/info/${initBookInfoId}/like`);
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
    setCurrentLike(refinelikeData[0].isLiked);
    setCurrentLikeNum &&setCurrentLikeNum(refinelikeData[0].likeNum);
  };

  const displayError = (error: any) => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    setOpenTitleAndMessage(title, errorCode ? message : error.message);
  };

  useEffect(() => {
    if (initBookInfoId) request(refineResponse, displayError);
  }, []);

  return { likeData };
};

export default useGetLike;
