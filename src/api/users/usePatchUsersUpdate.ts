import { useState, useEffect } from "react";
import { useApi } from "../../hook/useApi";
import { User } from "../../type";

type Props = {
  userId: number;
  exitEditMode: () => void;
};

export const usePatchUsersUpdate = ({ userId, exitEditMode }: Props) => {
  const [patchData, setPatchData] = useState<Partial<User>>();
  const { request } = useApi("patch", `users/update/${userId}`, patchData);
  const expectedItem: { [key: string]: string } = {
    nickname: "string",
    intraId: "number",
    slack: "string",
    role: "number",
    penaltyEndDate: "date",
  };

  const requestUpdate = (data: any) => {
    const refinedData: { [key: string]: string } = {};
    Object.keys(data).forEach(key => {
      const value =
        expectedItem[key] === "number" ? parseInt(data[key], 10) : data[key];
      if (value || (key === "role" && value === 0)) refinedData[key] = value;
    });
    if (Object.keys(refinedData).length > 0) setPatchData({ ...refinedData });
  };

  const onSuccess = () => {
    exitEditMode();
  };

  useEffect(() => {
    if (patchData !== null) request(onSuccess);
  }, [patchData]);

  return { requestUpdate };
};
