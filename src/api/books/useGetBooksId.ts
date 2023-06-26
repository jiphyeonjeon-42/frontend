import { useState, useEffect } from "react";
import { useApi } from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";
import { AxiosResponse } from "axios";
import { Book } from "../../type";

type Props = {
  setSelectedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  closeModal: () => void;
};

export const useGetBooksId = ({ setSelectedBooks, closeModal }: Props) => {
  const [bookId, setBookId] = useState<string>();
  const { request } = useApi("get", `books/${bookId}`);

  const expectedItem = [
    { key: "id", type: "number", isNullable: false },
    { key: "title", type: "string", isNullable: false },
    { key: "isbn", type: "string", isNullable: true },
    { key: "image", type: "string", isNullable: true },
    { key: "callSign", type: "string", isNullable: false },
  ];

  const refineResponse = (response: AxiosResponse) => {
    const [book] = compareExpect("books/:id", [response.data], expectedItem);
    book.bookId = book.id;
    setSelectedBooks(prev => [...prev, book]);
    closeModal();
  };

  useEffect(() => {
    if (bookId) request(refineResponse);
  }, [bookId]);

  return { setBookId };
};

