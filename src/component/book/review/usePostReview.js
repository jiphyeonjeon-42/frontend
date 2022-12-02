import { useEffect, useState } from "react";
import useApi from "../../../hook/useApi";
import { compareExpect } from "../../../util/typeCheck";
// import getErrorMessage from "../../../data/error";

const usePostReview = ({
  setOpenTitleAndMessage,
  setClose,
  bookInfoId,
  changeTab,
}) => {
  const [content, setContent] = useState(null);
  const { request } = useApi("post", "/reviews", {
    bookInfoId,
    content,
  });

  const expectedItem = [
    { key: "bookInfoId", type: "number", isNullable: false },
    { key: "content", type: "string", isNullable: false },
  ];

  const refineResponse = response => {
    compareExpect(`reviews`, [response.data], expectedItem);
  };

  const displayError = error => {
    console.log(error);
    setOpenTitleAndMessage(
      "10자 이상 100자 이하로 입력해주세요.",
      "",
      setClose,
    );
    //   setOpenTitleAndMessage("예약 취소가 완료되었습니다.", "", () =>
    //   window.location.reload(),
    // );
    // const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    // const [title, message] = getErrorMessage(errorCode).split("\r\n");
    // setOpenTitleAndMessage(title, errorCode ? message : error.message);
  };

  useEffect(() => {
    const req = async () => {
      if (content !== null) {
        request(refineResponse, displayError);
        await changeTab(0);
      }
    };
    req();
  }, [content]);

  return { setContent };
};

export default usePostReview;
