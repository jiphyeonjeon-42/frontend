import { useState, useEffect } from "react";
import useApi from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";

const useGetBooksInfoNew = () => {
  const [bookList, setBookList] = useState([]);

  const { request, Dialog } = useApi("get", "books/info/", {
    sort: "new",
    limit: 20,
  });

  const expectedItem = [
    { key: "id", type: "number", isNullable: false },
    { key: "title", type: "string", isNullable: false },
    { key: "image", type: "string", isNullable: true },
  ];

  const refineResponse = response => {
    const books = compareExpect(
      "books/info",
      response.data.items,
      expectedItem,
    );
    setBookList(books);
  };

  useEffect(() => request(refineResponse), []);

  return { bookList, Dialog };
};

export default useGetBooksInfoNew;
