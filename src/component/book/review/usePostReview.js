import { useEffect, useState } from "react";
import useApi from "../../../hook/useApi";
import { compareExpect } from "../../../util/typeCheck";
import getErrorMessage from "../../../data/error";

const usePostReview = ({ setOpenTitleAndMessage, bookInfoId, changeTab }) => {
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
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    setOpenTitleAndMessage(title, errorCode ? message : error.message);
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
