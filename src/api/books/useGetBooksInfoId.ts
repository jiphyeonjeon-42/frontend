import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";
import { useNewDialog } from "../../hook/useNewDialog";

type Pros = {
  id: string;
};
export const useGetBooksInfoId = ({ id }: Pros) => {
  const [bookDetailInfo, setBookDetailInfo] = useState({ books: [] });
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
    const [books] = compareExpect(
      "books/info/id",
      [response.data],
      expectedItem,
    );
    setBookDetailInfo(books);
  };

  const { displayErrorDialog } = useNewDialog();
  const redirectIf304OrDisplayError = (error: any) => {
    const errorCode = error.response?.data.errorCode;
    if (errorCode === 304) {
      navigate("/search");
      window.scrollTo(0, 0);
    } else displayErrorDialog(error);
  };

  useEffect(() => {
    request(refineResponse, redirectIf304OrDisplayError);
  }, []);

  return { bookDetailInfo };
};
