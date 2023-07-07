import { useState, useEffect } from "react";
import useApi from "../../hook/useApi";
import getErrorMessage from "../../constant/error";
import { compareExpect } from "../../util/typeCheck";
import { Book } from "../../type";

type Props = {
  setOpenTitleAndMessage: (title: string, message: string) => void;
};

const useGetBooksInfoPopular = ({ setOpenTitleAndMessage }: Props) => {
  const [docs, setDocs] = useState<Book[]>([]);

  const { request } = useApi("get", "books/info", {
    sort: "popular",
    limit: 30,
  });

  const expectedItem = [
    { key: "id", type: "number", isNullable: false },
    { key: "title", type: "string", isNullable: false },
    { key: "author", type: "string", isNullable: false },
    { key: "category", type: "string", isNullable: false },
    { key: "publisher", type: "string", isNullable: false },
    { key: "image", type: "string", isNullable: true },
    { key: "publishedAt", type: "string", isNullable: true },
  ];

  const refineResponse = (response: any) => {
    const books = compareExpect(
      "books/info",
      response.data.items,
      expectedItem,
    );
    setDocs(books);
  };

  const onError = (error: any) => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    setOpenTitleAndMessage(title, message || error.message);
  };

  useEffect(() => request(refineResponse, onError), []);

  return { docs };
};

export default useGetBooksInfoPopular;
