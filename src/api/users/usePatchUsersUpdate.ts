import { useState, useEffect } from "react";
import { useApi } from "../../hook/useApi";

type Props = {
  userId: number;
  exitEditMode: () => void;
};

export const usePatchUsersUpdate = ({ userId, exitEditMode }: Props) => {
  const [patchData, setPatchData] = useState(null);
  const { request } = useApi("patch", `users/update/${userId}`, patchData);
  const expectedItem = {
    nickname: "string",
    intraId: "number",
    slack: "string",
    role: "number",
    penaltyEndDate: "date",
  };

  const requestUpdate = (data: any) => {
    const refinedData = {};
    Object.keys(data).forEach(key => {
      const value =
        expectedItem[key] === "number" ? parseInt(data[key], 10) : data[key];
      if (value || (key === "role" && value === 0)) refinedData[key] = value;
    });
    if (Object.keys(refinedData).length > 0) setPatchData(refinedData);
  };

  const onSuccess = () => {
    exitEditMode();
  };

  useEffect(() => {
    if (patchData !== null) request(onSuccess);
  }, [patchData]);

  return { requestUpdate };
};
