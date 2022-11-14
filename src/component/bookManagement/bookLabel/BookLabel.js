import React from "react";
import propTypes from "prop-types";
import QRGenerator from "../QRGenerator";
import logo from "../../../img/logo_img.png";
import { category } from "../../../data/category";

const BookLabel = ({ book }) => {
  const categoryColor = item => {
    const color = category.find(i => i.code === item.callSign[0])?.color;
    return (color && [color, "#FFFFFF"]) || ["#FFFFFF", "#000000"];
  };

  const categoryName = item => {
    const name = category.find(i => i.code === item.callSign[0])?.name;
    const slash = name.indexOf("/");
    if (slash === -1) return [name, ""];
    return [name.slice(0, slash), name.slice(slash)];
  };

  const callSignInLabel = callSign => {
    const splitedCallSign = callSign.split(".");
    const first = `${splitedCallSign[0]}.${splitedCallSign[1]}`;
    const second = `${splitedCallSign[2]} ${splitedCallSign[3]}`;
    return [first, second];
  };

  return (
    <div key={book.bookId} className="print-label__labels">
      <div className="print-label__category-label">
        <div
          className="print-label__category-label__text"
          style={{
            backgroundColor: categoryColor(book)[0],
            color: categoryColor(book)[1],
          }}
        >
          <p>{categoryName(book)[0]}</p>
          <p> {categoryName(book)[1]}</p>
        </div>

        <div className="print-label__category-label__call-sign">
          <p>{callSignInLabel(book.callSign)[0]}</p>
          <p>{callSignInLabel(book.callSign)[1]}</p>
        </div>
        <img
          src={logo}
          alt="logo in label"
          className="print-label__category-label__logo"
        />
      </div>
      <div className="print-label__label">
        <QRGenerator
          string={`${book.bookId} ${book.isbn}`}
          svgClassName="print-label__label__qrcode"
          qrHeight={130}
          qrWidth={130}
        />
        <div className="print-label__label__call-sign">
          <p>{callSignInLabel(book.callSign)[0]}</p>
          <p>{callSignInLabel(book.callSign)[1]}</p>
        </div>
        <p className="print-label__label__logo-text">42집현전</p>
        <img
          src={logo}
          alt="logo in label"
          className="print-label__label__logo"
        />
      </div>
    </div>
  );
};

export default BookLabel;

BookLabel.propTypes = {
  book: propTypes.objectOf().isRequired,
};
