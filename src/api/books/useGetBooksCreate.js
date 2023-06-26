import { useState, useEffect } from "react";
import { useApi } from "../../hook/useApi";
// import { useDebounce } from "../../hook/useDebounce";
import { compareExpect } from "../../util/typeCheck";
import getErrorMessage from "../../constant/error";

export const useGetBooksCreate = defalutBook => {
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

  const refineResponse = response => {
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

  const displayError = error => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    setErrorMessage(
      errorCode === 401
        ? "로그인 유효시간이 지났습니다. 로그아웃 후 재로그인 해주세요! "
        : getErrorMessage(errorCode) || error.message,
    );
    setBookInfo(defalutBook);
  };
  // const debounce = useDebounce();
  const fetchData = isbn => {
    setIsbnQuery(isbn);
  };

  useEffect(() => {
    if (isbnQuery && isbnQuery.length) {
      request(refineResponse, displayError);
    }
  }, [isbnQuery]);

  return { bookInfo, errorMessage, fetchData, setBookInfo };
};
