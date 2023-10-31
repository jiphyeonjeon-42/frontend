import { useState, useEffect } from "react";
import { useApi } from "../../hook/useApi";
import getErrorMessage from "../../constant/error";
import { NewBook } from "../../type";

const emptyBook: NewBook = {
  title: "",
  author: "",
  isbn: "",
  publisher: "",
  publishedAt: "",
  image: "",
  category: "",
};

export const useGetBooksCreate = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [bookInfo, setBookInfo] = useState(emptyBook);
  const { requestWithUrl } = useApi();

  const refineResponse = (response: any) => {
    const { bookInfo: info } = response.data as GetBooksCreateDto;
    setBookInfo({
      ...info,
      publishedAt: info.pubdate,
    });
    setErrorMessage("");
  };

  const displayError = (error: any) => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    setErrorMessage(
      errorCode === 401
        ? "로그인 유효시간이 지났습니다. 로그아웃 후 재로그인 해주세요! "
        : getErrorMessage(errorCode) || error.message,
    );
    setBookInfo(emptyBook);
  };

  const fetchData = (isbn: string) => {
    if (isbn.length < 0) return;
    requestWithUrl("get", `books/create`, {
      data: { isbnQuery: isbn },
      onSuccess: refineResponse,
      onError: displayError,
    });
  };

  return { bookInfo, errorMessage, fetchData, setBookInfo };
};

type GetBooksCreateDto = {
  // 2023.10.30 기준 GET v1/books/create 응답값 타입
  bookInfo: {
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    pubdate: string; // "yyyymmdd"
    image: string;
    category: string; // "number"
  };
};
