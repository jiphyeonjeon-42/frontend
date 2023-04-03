import { useState } from "react";
import PropTypes from "prop-types";

const labelText = {
  author: "저 자",
  publisher: "출판사",
  pubdate: "출판일",
};

const DisplayBasicBookInfo = ({ bookInfo, setBookInfo }) => {
  const [message, setMessage] = useState("");

  const onChangeInput = e => {
    const { id, value } = e.currentTarget;
    if (id === "pubdate") {
      const isValidDate = RegExp(
        /^\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/,
      ).test(value);
      const currentMessage = !isValidDate
        ? `날짜는 yyyymmdd 형식을 지켜주세요 ex.19450815`
        : "";
      if (message !== currentMessage) setMessage(currentMessage);
    }
    setBookInfo({
      ...bookInfo,
      [id]: value,
    });
  };

  return (
    <>
      <p className="color-red ">ISBN 도서정보</p>
      <label htmlFor="title" className=" add-book__underlined">
        <textarea
          className="add-book__basic-info__input font-28-bold"
          id="title"
          value={bookInfo.title}
          onChange={onChangeInput}
        />
      </label>
      {Object.keys(labelText).map(key => {
        return (
          <label htmlFor={key} className="add-book__book-info__text">
            <span className="font-16-bold add-book__book-info__text-key">
              {labelText[key]}
            </span>
            <input
              className="add-book__basic-info__input "
              type="text"
              id={key}
              value={bookInfo[key]}
              onChange={onChangeInput}
              required
            />
          </label>
        );
      })}
      {message && <p>{message}</p>}
    </>
  );
};

export default DisplayBasicBookInfo;

DisplayBasicBookInfo.propTypes = {
  bookInfo: PropTypes.shape({
    isbn: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    pubdate: PropTypes.string.isRequired,
  }).isRequired,
  setBookInfo: PropTypes.func.isRequired,
};
