import { useState, useEffect } from "react";
import { useApi } from "../../hook/useApi";
// import { useDebounce } from "../../hook/useDebounce";
import { compareExpect } from "../../util/typeCheck";
import getErrorMessage from "../../constant/error";
import { Book } from "../../type";
import { AxiosError, AxiosResponse } from "axios";

export const useGetBooksCreate = (defalutBook: Book) => {
  const [isbnQuery, setIsbnQuery] = useState("");
  const [bookInfo, setBookInfo] = useState(defalutBook);
  const [errorMessage, setErrorMessage] = useState("");

  const { request } = useApi("get", "books/create", {
    isbnQuery,
  });

  const expectedItem = [
    { key: "title", type: "string", isNullable: false },
    { key: "author", type: "string", isNullable: false },
    { key: "publisher", type: "string", isNullable: false },
    { key: "pubdate", type: "string", isNullable: false },
    { key: "category", type: "string", isNullable: false },
    { key: "image", type: "string", isNullable: true },
  ];

  const refineResponse = (response: AxiosResponse) => {
    const books = compareExpect(
      "books/create",
      [response.data.bookInfo],
      expectedItem,
    );
    setBookInfo({
      ...books[0],
      isbn: isbnQuery,
      koreanDemicalClassification: books[0].category,
    });
    setErrorMessage("");
  };

  const displayError = (error: AxiosError<{ errorCode: number }>) => {
    const errorCode = error?.response?.data?.errorCode;
    setErrorMessage(
      errorCode === 401
        ? "로그인 유효시간이 지났습니다. 로그아웃 후 재로그인 해주세요! "
        : getErrorMessage(errorCode) || error.message,
    );
    setBookInfo(defalutBook);
  };

  useEffect(() => {
    if (isbnQuery && isbnQuery.length) {
      request(refineResponse, displayError);
    }
  }, [isbnQuery]);

  return { bookInfo, errorMessage, fetchData: setIsbnQuery, setBookInfo };
};
