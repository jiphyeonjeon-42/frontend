import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";

type Props = {
  bookInfoId: number;
  changeTab: (tab: number) => void;
  setOpenTitleAndMessage: (title: string, message: string) => void;
};

export const usePostReview = ({
  bookInfoId,
  changeTab,
  setOpenTitleAndMessage,
}: Props) => {
  const checkLogin = JSON.parse(window.localStorage.getItem("user") || "");
  const [content, setContent] = useState("");
  const { request } = useApi("post", "/reviews", {
    bookInfoId,
    content,
  });

  const refineResponse = () => {
    changeTab(0);
  };

  const displayError = async () => {
    if (checkLogin === null) {
      setOpenTitleAndMessage("로그인 후 입력해주세요.", "");
    } else {
      setOpenTitleAndMessage("10자 이상 420자 이하로 입력해주세요.", "");
    }
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
