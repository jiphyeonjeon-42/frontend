import { useState, useEffect } from "react";
import useApi from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";

const useGetBooksInfoPopular = () => {
  const [docs, setDocs] = useState([]);

  const { request, Dialog } = useApi("get", "books/info", {
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

  const refineResponse = response => {
    const books = compareExpect(
      "books/info",
      response.data.items,
      expectedItem,
    );
    setDocs(books.map((book, index) => ({ ...book, rank: index + 1 })));
  };

  useEffect(() => request(refineResponse), []);

  return { docs, Dialog };
};

export default useGetBooksInfoPopular;