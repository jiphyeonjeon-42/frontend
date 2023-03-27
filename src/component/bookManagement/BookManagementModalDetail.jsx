import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Button from "../utils/Button";
import InputWithLabel from "../utils/InputWithLabel";
import SelectWithLabel from "../utils/SelectWithLabel";
import { bookStatus } from "../../data/status";
import usePatchBooksUpdate from "../../api/books/usePatchBooksUpdate";
import { category } from "../../data/category";
import "../../css/BookManagementDetail.css";
import Image from "../utils/Image";

const BookManagementModalDetail = ({ book, closeModal }) => {
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(book.image);
  const [reset, setReset] = useState(false);

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const publisherRef = useRef(null);
  const publishedAtRef = useRef(null);
  const isbnRef = useRef(null);
  const imageRef = useRef(null);
  const callSignRef = useRef(null);
  const statusRef = useRef(null);
  const categoryRef = useRef(null);

  const { setChange, Dialog } = usePatchBooksUpdate({
    title: book.title,
    closeModal,
  });

  const collectChange = () => {
    const change = { ...book };
    const modifyFromRef = (key, ref) => {
      change[key] = book[key];
      if (ref.current !== null && ref.current.value !== book[key]) {
        change[key] = ref.current.value;
      }
    };
    modifyFromRef("title", titleRef);
    modifyFromRef("author", authorRef);
    modifyFromRef("publisher", publisherRef);
    modifyFromRef("publishedAt", publishedAtRef);
    modifyFromRef("isbn", isbnRef);
    modifyFromRef("image", imageRef);
    modifyFromRef("callSign", callSignRef);
    modifyFromRef("categoryId", categoryRef);
    modifyFromRef("status", statusRef);
    change.categoryId = parseInt(change.categoryId, 10) + 1;
    return change;
  };

  const checkChange = change => {
    const dateRegex = /^(19|20)(\d{2})(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/;
    const callSignRegex = /^[A-Za-z][0-9]{1,3}\.[0-9]{2}\.v[1-9]\.c[1-9]$/;
    const isbnRegex = /^\d{13}$/;

    const validateDate = dateRegex.test(change.publishedAt);
    const validateCallSign = callSignRegex.test(change.callSign);
    const validateCategory =
      change.callSign[0] ===
      category.find(item => parseInt(item.id, 10) === change.categoryId)?.code;
    const validateISBN = isbnRegex.test(change.isbn);

    let errorMessage = "";
    if (validateDate && validateCallSign && validateCategory && validateISBN)
      return errorMessage;

    if (!validateDate)
      errorMessage += "출판일자 날짜형식 yyyddmm에 맞지 않습니다.\n";
    if (!validateCallSign) errorMessage += `청구기호 형식이 맞지 않습니다.\n`;
    if (!validateCategory) {
      errorMessage += "카테고리와 청구기호가 맞지 않습니다.\n";
    }
    if (!validateISBN) errorMessage += "13자리 ISBN를 입력해주세요";
    return errorMessage;
  };

  const handleConfirm = () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }
    const change = collectChange();
    const errorMessage = checkChange(change);
    setMessage(errorMessage);
    if (!errorMessage.length) {
      setChange(change);
      setEditMode(false);
    }
  };

  return (
    <div className="book-management__detail__wrarpper">
      <Dialog />
      <p className="book-management__detail__title">도서정보</p>
      <div className="book-management__detail__book-info">
        <Image
          className="book-management__detail__book-cover"
          src={image}
          alt={book.title}
        />
        <div className="book-management__detail__details">
          <InputWithLabel
            labelText="INFO ID"
            disabled
            inputInitialValue={book.bookInfoId}
          />
          <InputWithLabel
            labelText="제목"
            disabled={!editMode}
            resetDependency={reset}
            inputRef={titleRef}
            inputInitialValue={book.title}
          />
          <InputWithLabel
            labelText="저자"
            disabled={!editMode}
            inputRef={authorRef}
            resetDependency={reset}
            inputInitialValue={book.author}
          />
          <InputWithLabel
            labelText="출판사"
            disabled={!editMode}
            inputRef={publisherRef}
            resetDependency={reset}
            inputInitialValue={book.publisher}
          />
          <InputWithLabel
            labelText="출판일"
            disabled={!editMode}
            inputRef={publishedAtRef}
            resetDependency={reset}
            inputInitialValue={book.publishedAt}
          />
          <InputWithLabel
            labelText="ISBN"
            disabled={!editMode}
            inputRef={isbnRef}
            resetDependency={reset}
            inputInitialValue={book.isbn}
          />
          <InputWithLabel
            labelText="표지이미지"
            disabled={!editMode}
            inputRef={imageRef}
            resetDependency={reset}
            onChangeCallBack={setImage}
            inputInitialValue={book.image}
          />
          <SelectWithLabel
            labelText="카테고리"
            disabled={!editMode}
            selectRef={categoryRef}
            resetDependency={reset}
            optionList={category.map(i => i.name)}
            initialSelectedIndex={book.categoryId - 1}
          />
        </div>
      </div>
      <div className="book-management__detail__book">
        <p>도서관리정보</p>
        <div className="book-management__detail__details">
          <InputWithLabel
            labelText="BOOK ID"
            disabled
            inputInitialValue={book.bookId}
          />
          <InputWithLabel
            labelText="청구기호"
            disabled={!editMode}
            inputRef={callSignRef}
            resetDependency={reset}
            inputInitialValue={book.callSign}
          />
          <SelectWithLabel
            labelText="도서 상태"
            disabled={!editMode}
            selectRef={statusRef}
            resetDependency={reset}
            optionList={bookStatus.map(status => status.string)}
            initialSelectedIndex={book.status}
          />
        </div>
      </div>
      {message ? (
        <p className="book-management__detail__message">{`${message}`}</p>
      ) : null}
      <div className="book-management__detail__buttons">
        {editMode ? (
          <Button
            value="취소하기"
            onClick={() => {
              setReset(!reset);
              setEditMode(false);
            }}
          />
        ) : null}
        <Button
          className="book-management__detail__button"
          value={editMode ? "저장하기" : "수정하기"}
          color={editMode ? "red" : ""}
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
};

export default BookManagementModalDetail;

BookManagementModalDetail.propTypes = {
  book: PropTypes.shape().isRequired,
  closeModal: PropTypes.func.isRequired,
};
