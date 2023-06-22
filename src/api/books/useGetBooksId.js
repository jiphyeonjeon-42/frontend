import { useState, useEffect } from "react";
import { useApi } from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";

const useGetBooksId = ({ setSelectedBooks, closeModal }) => {
  const [bookId, setBookId] = useState(null);
  const { request, Dialog } = useApi("get", `books/${bookId}`);

  const expectedItem = [
    { key: "id", type: "number", isNullable: false },
    { key: "title", type: "string", isNullable: false },
    { key: "isbn", type: "string", isNullable: true },
    { key: "image", type: "string", isNullable: true },
    { key: "callSign", type: "string", isNullable: false },
  ];

  const refineResponse = response => {
    const [book] = compareExpect("books/:id", [response.data], expectedItem);
    book.bookId = book.id;
    setSelectedBooks(prev => [...prev, book]);
    closeModal(false);
  };

  useEffect(() => {
    if (bookId) request(refineResponse);
  }, [bookId]);

  return { setBookId, Dialog };
};

export default useGetBooksId;
