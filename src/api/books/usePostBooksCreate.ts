import { useState } from "react";
import { useApi } from "../../hook/useApi";
import getErrorMessage from "../../constant/error";
import { BookInfo } from "../../type";

export const usePostBooksCreate = () => {
  const [message, setMessage] = useState("");
  const { requestWithUrl } = useApi();

  const displaySuccess = () => {
    setMessage("등록되었습니다!");
    window.location.reload();
  };

  const displayError = (error: any) => {
    const errorCode = error?.response?.data?.errorCode;
    const errorMessage = errorCode ? getErrorMessage(errorCode) : error.message;
    setMessage(`실패했습니다. ${errorMessage} `);
  };

  const registerBook = (
    newBook: Omit<BookInfo, "id">,
    categoryId: string,
    donator: string | null,
  ) => {
    const book: PostBooksCreateDto = {
      ...newBook,
      pubdate: newBook.publishedAt,
      categoryId,
      donator,
    };

    requestWithUrl("post", "books/create", {
      data: book,
      onSuccess: displaySuccess,
      onError: displayError,
    });
  };

  return {
    message,
    registerBook,
  };
};

type PostBooksCreateDto = {
  // 2023.10.31 기준 POST v1/books/create 요청값 타입
  title: string;
  isbn: string | null;
  author: string;
  publisher: string;
  image: string | null;
  categoryId: string;
  pubdate: string;
  donator: string | null;
};
