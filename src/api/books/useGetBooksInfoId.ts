import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getErrorMessage from "../../constant/error";
import { useApi } from "../../hook/useApi";
import { BookInfo } from "../../type";
import { compareExpect } from "../../util/typeCheck";

type Pros = {
  id: string;
  setOpenTitleAndMessage: (
    title: string,
    message: string,
    afterClose: () => void,
  ) => void;
};

export const useGetBooksInfoId = ({ id, setOpenTitleAndMessage }: Pros) => {
  const [bookDetailInfo, setBookDetailInfo] = useState<BookInfo>();
  const navigate = useNavigate();

  const { request } = useApi("get", `books/info/${id}`);

  const expectedItem = [
    { key: "id", type: "number", isNullable: false },
    { key: "title", type: "string", isNullable: false },
    { key: "author", type: "string", isNullable: false },
    { key: "publisher", type: "string", isNullable: false },
    { key: "publishedAt", type: "string", isNullable: true },
    { key: "category", type: "string", isNullable: false },
    { key: "image", type: "string", isNullable: true },
    {
      key: "books",
      type: [
        { key: "donator", type: "string", isNullable: true },
        { key: "callSign", type: "string", isNullable: false },
        { key: "isLendable", type: "bool", isNullable: false },
        { key: "isReserved", type: "bool", isNullable: false },
        { key: "dueDate", type: "string", isNullable: false },
        { key: "status", type: "number", isNullable: false },
      ],
      isNullable: false,
    },
  ];

  const refineResponse = (response: any) => {
    const [bookInfo] = compareExpect(
      "books/info/id",
      [response.data],
      expectedItem,
    );
    setBookDetailInfo(bookInfo);
  };

  const displayError = (error: any) => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    const [title, message] = getErrorMessage(errorCode).split("\r\n");

    const afterClose = () => {
      if (errorCode === 304) {
        navigate("/search");
        window.scrollTo(0, 0);
      }
    };
    setOpenTitleAndMessage(
      title,
      errorCode ? message : `${message}\r\n${error?.message}`,
      afterClose,
    );
  };

  useEffect(() => {
    request(refineResponse, displayError);
  }, []);

  return { bookDetailInfo };
};
