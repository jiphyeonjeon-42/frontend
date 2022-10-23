import { useState, useEffect } from "react";
import useApi from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";

const useGetBooksId = ({ setSelctedBooks, closeModal }) => {
  const [bookId, setBookId] = useState(null);
  const { request } = useApi("get", `books/${bookId}`);

  const expectedItem = [
    { key: "id", type: "number", isNullable: false },
    { key: "title", type: "string", isNullable: false },
    { key: "isbn", type: "string", isNullable: true },
    { key: "image", type: "string", isNullable: true },
    { key: "callSign", type: "string", isNullable: false },
  ];

  const refineResponse = response => {
    const book = compareExpect("books/:bookid", [response.data], expectedItem);
    setSelctedBooks(prev => [...prev, ...book]);
    closeModal(false);
  };

  const displayError = error => console.log(error.message);

  useEffect(() => {
    if (bookId) request(refineResponse, displayError);
  }, [bookId]);

  return { setBookId };
};

export default useGetBooksId;
