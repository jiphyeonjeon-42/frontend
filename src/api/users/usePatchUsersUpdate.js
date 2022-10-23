import { useState, useEffect } from "react";
import useApi from "../../hook/useApi";

const usePatchUsersUpdate = ({ userId, exitEditMode }) => {
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
    const refinedData = {};
    Object.keys(data).forEach(key => {
      const value =
        expectedItem[key] === "number" ? parseInt(data[key], 10) : data[key];
      if (value) refinedData[key] = value;
    });
    if (Object.keys(refinedData).length > 0) setPatchData(refinedData);
  };

  const onSuccess = () => {
    exitEditMode();
  };

  useEffect(() => {
    if (patchData === null) return;
    request(onSuccess);
  }, [patchData]);

  return { requestUpdate, Dialog };
};

export default usePatchUsersUpdate;
