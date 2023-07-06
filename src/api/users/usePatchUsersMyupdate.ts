import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setErrorDialog } from "../../constant/error";
import { useApi } from "../../hook/useApi";

type Props = {
  modeString: string;
  setOpenTitleAndMessage: (
    title: string,
    message: string,
    afterClose?: () => void,
  ) => void;
};

export const usePatchUsersMyupdate = ({
  modeString,
  setOpenTitleAndMessage,
}: Props) => {
  const [patchData, setPatchData] = useState<{
    email?: string;
    password?: string;
  }>();
  const { request } = useApi("patch", "/users/myupdate", patchData);
  const navigate = useNavigate();

  const onSuccess = () => {
    setOpenTitleAndMessage(`${modeString} 변경 성공`, "", () =>
      navigate("/auth"),
    );
  };

  const onError = (error: any) => {
    setErrorDialog(error, setOpenTitleAndMessage, () => navigate("-1"));
  };

  useEffect(() => {
    if (patchData) request(onSuccess, onError);
  }, [patchData]);

  return { setPatchData };
};
