import { useEffect } from "react";
import useDialog from "../../hook/useDialog";

const HiddenModal = () => {
  // 페이지 전환 후 띄워야 하는 모달일 경우(ex./auth) localstorage 이용
  const { isOpen, Dialog, setOpenTitleAndMessage } = useDialog();

  useEffect(() => {
    const error = JSON.parse(window.localStorage.getItem("error"));
    if (error) {
      setOpenTitleAndMessage(error?.title, error?.message, () =>
        window.localStorage.removeItem("error"),
      );
    }
  }, []);

  return <>{isOpen && <Dialog />}</>;
};

export default HiddenModal;
