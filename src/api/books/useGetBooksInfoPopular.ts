import { useState, useEffect } from "react";
import { useApi } from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";
import { Book } from "../../type";

export const useGetBooksInfoPopular = () => {
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

  useEffect(() => request(refineResponse), []);

  return { docs };
};
