import { useState, useEffect } from "react";
import useApi from "../../hook/useApi";
import getErrorMessage from "../../data/error";
import { compareExpect } from "../../util/typeCheck";

const usePostBooksCreate = () => {
  const [newBookInfo, setNewBookInfo] = useState(null);
  const [message, setMessage] = useState("");

  const { request } = useApi("post", "books/create", newBookInfo);

  const expectedItem = [
    { key: "title", type: "string", isNullable: false },
    { key: "isbn", type: "string", isNullable: true },
    { key: "author", type: "string", isNullable: false },
    { key: "publisher", type: "string", isNullable: false },
    { key: "pubdate", type: "string", isNullable: false },
    { key: "categoryId", type: "string", isNullable: false },
    { key: "image", type: "string", isNullable: true },
    { key: "donator", type: "string", isNullable: true },
  ];

  const displaySuccess = () => {
    setMessage("등록되었습니다!");
    window.location.reload();
  };

  const displayError = error => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    const errorMessage = errorCode ? getErrorMessage(errorCode) : error.message;
    setMessage(`실패했습니다. ${errorMessage} `);
  };

  const registerBook = newBook => {
    try {
      const book = compareExpect("books/create", [newBook], expectedItem);
      setNewBookInfo(...book);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (newBookInfo) {
      request(displaySuccess, displayError);
    }
  }, [newBookInfo]);

  return {
    message,
    registerBook,
  };
};

export default usePostBooksCreate;
