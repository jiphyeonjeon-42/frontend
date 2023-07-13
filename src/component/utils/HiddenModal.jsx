import { useEffect } from "react";
import { useNewDialog } from "../../hook/useNewDialog";

const HiddenModal = () => {
  // 페이지 전환 후 띄워야 하는 모달일 경우(ex./auth) localstorage 이용
  const { addDialogWithTitleAndMessage } = useNewDialog();
  useEffect(() => {
    const error = JSON.parse(window.localStorage.getItem("error"));
    if (error) {
      addDialogWithTitleAndMessage(
        error?.title,
        error?.title,
        error?.message,
        () => window.localStorage.removeItem("error"),
      );
    }
  }, []);

  return <></>;
};

export default HiddenModal;
