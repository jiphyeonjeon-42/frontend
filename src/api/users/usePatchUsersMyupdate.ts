import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  modeKorean: string;
};

export const usePatchUsersMyupdate = ({ modeKorean }: Props) => {
  const [patchData, setPatchData] = useState<{
    email?: string;
    password?: string;
  }>();
  const { request } = useApi("patch", "/users/myupdate", patchData);
  const navigate = useNavigate();
  const { addDialogWithTitleAndMessage, displayErrorDialog } = useNewDialog();

  const onSuccess = () => {
    addDialogWithTitleAndMessage(
      "patchSuccess",
      `${modeKorean} 변경 성공`,
      "",
      () => navigate("/auth"),
    );
  };

  const onError = (error: any) => {
    displayErrorDialog(error, () => navigate("-1"));
  };

  useEffect(() => {
    if (patchData) request(onSuccess, onError);
  }, [patchData]);

  return { setPatchData };
};
