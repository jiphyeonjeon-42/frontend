import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  modeString: string;
};

export const usePatchUsersMyupdate = ({ modeString }: Props) => {
  const [patchData, setPatchData] = useState<{
    email?: string;
    password?: string;
  }>();
  const { request } = useApi("patch", "/users/myupdate", patchData);
  const navigate = useNavigate();
  const { addDialogWithTitleAndMessage, addErrorDialog } = useNewDialog();
  const onSuccess = () => {
    const title = `${modeString} 변경 성공`;
    addDialogWithTitleAndMessage(`key-user-${title}`, title, "", () =>
      navigate("/auth"),
    );
  };

  const onError = (error: any) => {
    addErrorDialog(error, () => navigate("-1"));
  };

  useEffect(() => {
    if (patchData) request(onSuccess, onError);
  }, [patchData]);

  return { setPatchData };
};
