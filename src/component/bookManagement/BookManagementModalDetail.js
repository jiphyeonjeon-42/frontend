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
    const change = book;
    const checkChange = (key, ref) => {
      change[key] = book[key];
      if (ref.current !== null && ref.current.value !== book[key]) {
        console.log(ref.current.value);
        change[key] = ref.current.value;
      }
    };
    checkChange("title", titleRef);
    checkChange("author", authorRef);
    checkChange("publisher", publisherRef);
    checkChange("publishedAt", publishedAtRef);
    checkChange("isbn", isbnRef);
    checkChange("image", imageRef);
    checkChange("callSign", callSignRef);
    checkChange("categoryId", categoryRef);
    checkChange("status", statusRef);
    change.categoryId = parseInt(change.categoryId, 10) + 1;
    return change;
  };

  const handleConfirm = () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }
    const change = collectChange();
    if (Object.keys(change).length) {
      setChange(change);
    }
    setEditMode(false);
  };

  return (
    <div className="book-management__detail__wrarpper">
      <Dialog />
      <p>도서정보</p>
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
            labelText="출판연월"
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
