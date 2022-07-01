import React from "react";
import PropTypes from "prop-types";

const DisplayExistedBookInfo = ({ existedBooksInfo }) => {
  return (
    <>
      <div className="add-book__extra-info">
        <p className="color-red">이미 등록된 도서 관리 정보</p>
        <div className="add-book__existed-books">
          {existedBooksInfo.map(element => {
            return (
              <p className="add-book__book-info__text" key={element.id}>
                <span className="add-book__existed-info__text">
                  {element.id}
                </span>
                <span className=" add-book__existed-info__text">
                  {element.category}
                </span>
                <span className=" add-book__existed-info__text">
                  {element.title}
                </span>
                <span className=" add-book__existed-info__text">
                  {element.callSign}
                </span>
                <span className=" add-book__existed-info__text">
                  {element.author}
                </span>
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DisplayExistedBookInfo;

DisplayExistedBookInfo.propTypes = {
  existedBooksInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
};
