import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import IsbnSearchBarWithBarcodeReader from "./AddBookIsbnSearchBarWithBarcodeReader";

const FetchBasicBookInfoWithIsbn = ({ setBookInfo }) => {
  const [message, setMessage] = useState("");

  const fetchBasicBookInformation = async isbnQuery => {
    setMessage("");
    await axios
      .get(`${process.env.REACT_APP_API}/books/create`, {
        params: {
          isbnQuery,
        },
      })
      .then(response => {
        const { isbn, title, image, author, publisher, pubdate, category } =
          response.data.bookInfo;

        setBookInfo({
          isConfirmedInfo: true,
          newBookBasicInfo: {
            isbn,
            title,
            image,
            author,
            publisher,
            pubdate,
            category,
            koreanDemicalClassification: category,
          },
        });
      })
      .catch(error => {
        const { status } = error.response;
        setMessage(
          status === 401
            ? "로그인 유효시간이 지났습니다. 로그아웃 후 재로그인 해주세요! "
            : "조회에 실패했습니다. 수동으로 입력해주세요!",
        );
        setBookInfo({
          isConfirmedInfo: false,
          newBookBasicInfo: {
            isbn: "",
            title: "",
            image: "",
            author: "",
            publisher: "",
            pubdate: "",
            koreanDemicalClassification: "",
          },
        });
      });
  };

  return (
    <>
      <IsbnSearchBarWithBarcodeReader
        fetchFunction={fetchBasicBookInformation}
      />
      <p>{message}</p>
    </>
  );
};

export default FetchBasicBookInfoWithIsbn;

FetchBasicBookInfoWithIsbn.propTypes = {
  setBookInfo: PropTypes.func.isRequired,
};
