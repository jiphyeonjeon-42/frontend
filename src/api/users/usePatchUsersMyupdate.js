import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setErrorDialog } from "../../constant/error";
import { useApi } from "../../hook/useApi";

const usePatchUsersMyupdate = ({ modeString, setOpenTitleAndMessage }) => {
  const [patchData, setPatchData] = useState(undefined);

  const { request } = useApi("patch", "/users/myupdate", patchData);
  const navigate = useNavigate();

  const onSuccess = () => {
    setOpenTitleAndMessage(`${modeString} 변경 성공`, "", () =>
      navigate("/auth"),
    );
  };
  const onError = error => {
    setErrorDialog(error, setOpenTitleAndMessage, () => navigate("-1"));
  };

  useEffect(() => {
    if (patchData) request(onSuccess, onError);
  }, [patchData]);

  return { setPatchData };
};

export default usePatchUsersMyupdate;
