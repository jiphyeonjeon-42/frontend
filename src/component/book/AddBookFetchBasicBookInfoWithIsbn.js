import React, { useState } from "react";
import axios from "axios";

import PropTypes from "prop-types";
import SearchBarNotHandleValueChange from "./SearchBarNotHandleValueChange";

const FetchBasicBookInfoWithIsbn = ({ setBookInfo }) => {
  const [message, setMessage] = useState("");
  const fetchBasicBookInformation = async ref => {
    const userInputIsbn = ref.current.value;
    setMessage("");
    await axios
      .get(`${process.env.REACT_APP_API}/books/create`, {
        params: {
          isbnQuery: userInputIsbn,
        },
      })
      .then(response => {
        const { isbn, title, image, author, publisher, pubdate } =
          response.data.isbnInNaver[0];
        const sameInfo = response.data.sameTitleOrAuthor;
        const sameIsbn = response.data.isbnInBookInfo;
        const recommendCallSign =
          response.data?.isbnInBookInfo[0]?.callSign?.slice(0, -1);

        const existedBooksInfo = sameInfo.filter(infoElement => {
          return sameIsbn.filter(isbnElement => {
            return JSON.stringify(isbnElement) !== JSON.stringify(infoElement);
          });
        });
        setBookInfo({
          isConfirmedInfo: true,
          newBookBasicInfo: {
            isbn,
            title,
            image,
            author,
            publisher,
            pubdate,
          },
          existedBooksInfo,
          recommendCallSign,
        });
      })
      .catch(error => {
        console.log(error.response.status);
        console.log(error.response.data.errorCode);
        setMessage(`조회에 실패했습니다. 수동으로 입력해주세요!`);
        setBookInfo({
          isConfirmedInfo: false,
          newBookBasicInfo: {
            isbn: "",
            title: "",
            image: "",
            author: "",
            publisher: "",
            pubdate: "",
          },
          existedBooksInfo: [],
          recommendCallSign: "",
        });
      });
  };

  return (
    <>
      <SearchBarNotHandleValueChange
        fetchFunction={fetchBasicBookInformation}
        formStyleName="add-book__basic-info__isbn-search"
      />
      <p>{message}</p>
    </>
  );
};

export default FetchBasicBookInfoWithIsbn;

FetchBasicBookInfoWithIsbn.propTypes = {
  setBookInfo: PropTypes.func.isRequired,
};
