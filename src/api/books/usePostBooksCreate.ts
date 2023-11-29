import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "~/hook/useApi";
import getErrorMessage from "~/constant/error";
import { type BookInfo } from "~/type";

export const usePostBooksCreate = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { requestWithUrl } = useApi();

  const displaySuccess = () => {
    setMessage("등록되었습니다!");
    navigate(0);
  };

  const displayError = (error: any) => {
    const errorCode = error?.response?.data?.errorCode;
    const errorMessage = errorCode ? getErrorMessage(errorCode) : error.message;
    setMessage(`실패했습니다. ${errorMessage} `);
  };

  const registerBook = (newBook: Omit<BookInfo, "id">) => {
    requestWithUrl("post", "books/create", {
      data: newBook,
      onSuccess: displaySuccess,
      onError: displayError,
    });
  };

  return { message, registerBook };
};
