import { useState, useEffect } from "react";
import { useApi } from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";
import { AxiosResponse } from "axios";
import { Book } from "../../type";

const useGetBooksInfoNew = () => {
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

  const refineResponse = (response: AxiosResponse<{ items: Book[] }>) => {
    const books = compareExpect(
      "books/info",
      response.data.items,
      expectedItem,
    );
    setBookList(books);
  };

  useEffect(() => request(refineResponse), []);

  return { bookList };
};

export default useGetBooksInfoNew;
