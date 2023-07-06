import { useEffect, useState } from "react";
import useApi from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";
import { User } from "../../type";
import { setErrorDialog } from "../../constant/error";

type Props = {
  userId: number;
  setDialogTitleAndMessage: (title: string, message: string) => void;
};

const useGetUsersSearchId = ({ userId, setDialogTitleAndMessage }: Props) => {
  const [userInfo, setUserInfo] = useState<User>();

  const { request } = useApi("get", "users/search", {
    id: userId,
  });

  const expectedItem = [
    { key: "id", type: "number", isNullable: false },
    { key: "email", type: "string", isNullable: false },
    { key: "intraId", type: "number", isNullable: true },
    { key: "nickname", type: "string", isNullable: true },
    { key: "role", type: "number", isNullable: false },
    { key: "slack", type: "string", isNullable: true },
    { key: "overDueDay", type: "number", isNullable: false },
    { key: "penaltyEndDate", type: "string", isNullable: false },
    {
      key: "lendings",
      type: [
        { key: "author", type: "string", isNullable: false },
        { key: "bookInfoId", type: "number", isNullable: false },
        { key: "duedate", type: "string", isNullable: false },
        { key: "image", type: "string", isNullable: true },
        { key: "lendDate", type: "string", isNullable: false },
        { key: "lendingCondition", type: "string", isNullable: false },
        { key: "overDueDay", type: "number", isNullable: false },
        { key: "reservedNum", type: "number", isNullable: false },
        { key: "title", type: "string", isNullable: false },
        { key: "userId", type: "number", isNullable: false },
      ],
      isNullable: false,
    },
    // reservations는 상황에 따라 key 변동성이 너무 큼
    { key: "reservations", type: "*", isNullable: false },
  ];

  const refineResponse = (response: any) => {
    const user = compareExpect(
      "users/search",
      response.data.items,
      expectedItem,
    );
    setUserInfo(user[0]);
  };

  const onError = (error: any) => {
    setErrorDialog(error, setDialogTitleAndMessage);
  };

  useEffect(() => request(refineResponse, onError), []);

  return { userInfo };
};

export default useGetUsersSearchId;
