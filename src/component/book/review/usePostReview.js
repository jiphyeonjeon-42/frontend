import { useEffect, useState } from "react";
import useApi from "../../../hook/useApi";
// import getErrorMessage from "../../../data/error";

const usePostReview = ({ setOpenTitleAndMessage, bookInfoId, changeTab }) => {
  const [content, setContent] = useState(null);
  const { request } = useApi("post", "/reviews", {
    bookInfoId,
    content,
  });

  const refineResponse = () => {
    changeTab(0);
  };

  const displayError = async () => {
    setOpenTitleAndMessage("10자 이상 100자 이하로 입력해주세요.", "");
  };

  useEffect(() => {
    const req = () => {
      if (content !== null) {
        request(refineResponse, displayError);
      }
    };
    req();
  }, [content]);

  return { setContent };
};

export default usePostReview;
