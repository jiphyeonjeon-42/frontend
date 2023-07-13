import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  bookInfoId: number;
  changeTab: (tab: number) => void;
};

export const usePostReview = ({ bookInfoId, changeTab }: Props) => {
  const checkLogin = JSON.parse(window.localStorage.getItem("user") || "{}");
  const [content, setContent] = useState("");
  const { request } = useApi("post", "/reviews", {
    bookInfoId,
    content,
  });

  const refineResponse = () => {
    changeTab(0);
  };
  const { addDialogWithTitleAndMessage } = useNewDialog();

  const displayError = () => {
    const title =
      checkLogin === null
        ? "로그인 후 입력해주세요."
        : "10자 이상 420자 이하로 입력해주세요.";
    addDialogWithTitleAndMessage(title, title, "");
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
