import { useState, useEffect } from "react";
import useApi from "../../hook/useApi";
import getErrorMessage from "../../constant/error";
import { compareExpect } from "../../util/typeCheck";
import { Book } from "../../type";

type Props = {
  setOpenTitleAndMessage: (title: string, message: string) => void;
};

const useGetBooksInfoNew = ({ setOpenTitleAndMessage }: Props) => {
  const [bookList, setBookList] = useState<Book[]>([]);

  const { request } = useApi("get", "books/info/", {
    sort: "new",
    limit: 20,
  });

  const expectedItem = [
    { key: "id", type: "number", isNullable: false },
    { key: "title", type: "string", isNullable: false },
    { key: "image", type: "string", isNullable: true },
    { key: "author", type: "string", isNullable: false },
  ];

  const refineResponse = (response: any) => {
    const books = compareExpect(
      "books/info",
      response.data.items,
      expectedItem,
    );
    setBookList(books);
  };

  const onError = (error: any) => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    setOpenTitleAndMessage(title, message || error.message);
  };

  useEffect(() => request(refineResponse, onError), []);
  
  return { bookList };
};

export default useGetBooksInfoNew;
