import { useState, useEffect } from "react";
import { setErrorDialog } from "../../constant/error";
import useApi from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";

const useGetBooksIdForStock = ({ id, setOpenTitleAndMessage, closeModal }) => {
  const [bookDetail, setBookDetail] = useState({});
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

  const refineResponse = response => {
    console.log(response);
    const [book] = compareExpect("books/:id", [response.data], expectedItem);
    setBookDetail(book);
  };

  const displayError = error => {
    closeModal();
    setErrorDialog(error, setOpenTitleAndMessage);
  };

  useEffect(() => {
    if (id) request(refineResponse, displayError);
  }, [id]);

  return { bookDetail };
};

export default useGetBooksIdForStock;
