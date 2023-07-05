import { useState, useEffect } from "react";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";
import { compareExpect } from "../../util/typeCheck";
import { Book } from "../../type";

type Props = {
  id: number;
  closeModal: () => void;
};
export const useGetBooksIdForStock = ({ id, closeModal }: Props) => {
  const [bookDetail, setBookDetail] = useState<Book>();
  const { request } = useApi("get", `books/${id}`);

  const expectedItem = [
    { key: "bookId", type: "number", isNullable: false },
    { key: "bookInfoId", type: "number", isNullable: false },
    { key: "title", type: "string", isNullable: false },
    { key: "author", type: "string", isNullable: false },
    { key: "category", type: "string", isNullable: false },
    { key: "status", type: "number", isNullable: false },
    { key: "isbn", type: "string", isNullable: true },
    { key: "publisher", type: "string", isNullable: true },
    { key: "publishedAt", type: "string", isNullable: true },
    { key: "image", type: "string", isNullable: true },
    { key: "callSign", type: "string", isNullable: false },
  ];

  const refineResponse = (response: any) => {
    console.log(response);
    const [book] = compareExpect("books/:id", [response.data], expectedItem);
    setBookDetail(book);
  };

  const { displayErrorDialog } = useNewDialog();

  const displayError = (error: any) => {
    displayErrorDialog(error, () => closeModal());
  };

  useEffect(() => {
    if (id) request(refineResponse, displayError);
  }, [id]);

  return { bookDetail };
};
