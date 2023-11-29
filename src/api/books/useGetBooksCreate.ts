import { useState } from "react";
import { useApi } from "~/hook/useApi";
import getErrorMessage from "~/constant/error";
import { type BookInfo } from "~/type";

export const useGetBooksCreate = (defalutBook: Omit<BookInfo, "id">) => {
  const [bookInfo, setBookInfo] = useState(defalutBook);
  const [errorMessage, setErrorMessage] = useState("");

  const { requestWithUrl } = useApi();

  const refineResponse = (response: any) => {
    setBookInfo(response.data.bookInfo);
    setErrorMessage("");
  };

  const displayError = (error: any) => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    setErrorMessage(
      errorCode === 401
        ? "로그인 유효시간이 지났습니다. 로그아웃 후 재로그인 해주세요! "
        : getErrorMessage(errorCode) || error.message,
    );
    setBookInfo(defalutBook);
  };

  const fetchData = (isbnQuery: string) => {
    if (!isbnQuery) return;
    requestWithUrl("get", "books/create", {
      data: { isbnQuery },
      onSuccess: refineResponse,
      onError: displayError,
    });
  };

  return { bookInfo, errorMessage, fetchData, setBookInfo };
};
