import { useState, useEffect } from "react";
import useApi from "../../hook/useApi";
import { replaceNull } from "../../util/typeCheck";

const usePatchUsersUpdate = ({ userId, setEditMode }) => {
  const [patchData, setPatchData] = useState(null);
  const { request, Dialog } = useApi(
    "patch",
    `users/update/${userId}`,
    patchData,
  );

  const expectedItem = {
    nickname: "string",
    intraId: "number",
    slack: "string",
    role: "number",
    penaltyEndDate: "date",
  };

  const requestUpdate = data => {
    const refinedData = data.keys().map(key => {
      return replaceNull(data[key], expectedItem[key]);
    });
    setPatchData(refinedData);
  };

  const onSuccess = () => {
    setEditMode(false);
  };

  useEffect(() => {
    if (patchData === null) return;
    request(onSuccess);
  }, [patchData]);

  return { requestUpdate, Dialog };
};

export default usePatchUsersUpdate;
