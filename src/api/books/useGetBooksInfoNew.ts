import { useState, useEffect } from "react";
import { useApi } from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";
import { Book } from "../../type";

export const useGetBooksInfoNew = () => {
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

  useEffect(() => request(refineResponse), []);

  return { bookList };
};
