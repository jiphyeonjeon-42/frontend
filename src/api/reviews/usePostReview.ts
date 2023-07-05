import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  bookInfoId: number;
  changeTab: (tab: number) => void;
};

export const usePostReview = ({ bookInfoId, changeTab }: Props) => {
  const checkLogin = JSON.parse(window.localStorage.getItem("user"));
  const [content, setContent] = useState("");
  const { request } = useApi("post", "/reviews", {
    bookInfoId,
    content,
  });

  const refineResponse = () => {
    changeTab(0);
  };

  const { addDialogWithTitleAndMessage } = useNewDialog();

  const displayError = async () => {
    if (checkLogin === null) {
      addDialogWithTitleAndMessage(
        "ReviewError",
        "로그인 후 입력해주세요.",
        "",
      );
    } else {
      addDialogWithTitleAndMessage(
        "ReviewError",
        "10자 이상 420자 이하로 입력해주세요.",
        "",
      );
    }
  };

  useEffect(() => {
    if (content) {
      request(refineResponse, displayError);
    }
  }, [content]);

  return { setContent };
};
