import { useState, useEffect } from "react";
import { useApi } from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";
import { BookInfo } from "../../type";

export const useGetBooksInfoPopular = () => {
  const [docs, setDocs] = useState<(BookInfo & { rank: number })[]>([]);

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
    const booksWithRank = books.map((book, index) => ({
      ...book,
      rank: index + 1,
    }));
    setDocs(booksWithRank);
  };

  useEffect(() => request(refineResponse), []);

  return { docs };
};
