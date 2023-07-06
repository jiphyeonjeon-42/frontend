import { useState, useRef } from "react";
import Button from "../utils/Button";
import InputWithLabel from "../utils/InputWithLabel";
import SelectWithLabel from "../utils/SelectWithLabel";
import { bookStatus } from "../../constant/status";
import usePatchBooksUpdate from "../../api/books/usePatchBooksUpdate";
import { category } from "../../constant/category";
import "../../asset/css/BookManagementDetail.css";
import Image from "../utils/Image";
import { Book } from "../../type";

type Props = {
  book: Book;
  closeModal: () => void;
};

const BookManagementModalDetail = ({ book, closeModal }: Props) => {
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
    bookTitle: book.title,
    closeModal,
  });

  const collectChange = () => {
    // 기존 책을 복사한 original과 입력값 비교해서 change에 저장
    const original: Book & { [key: string]: any } = { ...book };
    const change: Book & { [key: string]: any } = { ...book };

    const modifyFromRef = (key: string, ref: any) => {
      change[key] = original[key];
      if (ref.current !== null && ref.current.value !== original[key]) {
        if (typeof change[key] === "number")
          change[key] = parseInt(ref.current.value, 10);
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
    change.categoryId += 1; // select option의 index는 0부터 시작하므로 +1
    return change;
  };

  const checkChange = (change: Book) => {
    // 도서 상세정보 수정 시 입력값 검사
    const dateRegex = /^(19|20)(\d{2})(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/;
    const callSignRegex = /^[A-Za-z][0-9]{1,3}\.[0-9]{2}\.v[1-9]\.c[1-9]$/;
    const isbnRegex = /^\d{13}$/;

    const validateDate =
      change.publishedAt && dateRegex.test(change.publishedAt);
    const validateCallSign = callSignRegex.test(change.callSign);
    const validateCategory =
      change.callSign[0] ===
      category.find(item => parseInt(item.id, 10) === change.categoryId)?.code;
    const validateISBN = change.isbn && isbnRegex.test(change.isbn);

    let errorMessage = "";
    if (validateDate && validateCallSign && validateCategory && validateISBN)
      return errorMessage;

    if (!validateDate)
      errorMessage += "출판일자 날짜형식 yyyddmm에 맞지 않습니다.\n";
    if (!validateCallSign) errorMessage += "청구기호 형식이 맞지 않습니다.\n";
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
            ref={titleRef}
            inputInitialValue={book.title}
          />
          <InputWithLabel
            labelText="저자"
            disabled={!editMode}
            ref={authorRef}
            resetDependency={reset}
            inputInitialValue={book.author}
          />
          <InputWithLabel
            labelText="출판사"
            disabled={!editMode}
            ref={publisherRef}
            resetDependency={reset}
            inputInitialValue={book.publisher}
          />
          <InputWithLabel
            labelText="출판일"
            disabled={!editMode}
            ref={publishedAtRef}
            resetDependency={reset}
            inputInitialValue={book.publishedAt}
          />
          <InputWithLabel
            labelText="ISBN"
            disabled={!editMode}
            ref={isbnRef}
            resetDependency={reset}
            inputInitialValue={book.isbn}
          />
          <InputWithLabel
            labelText="표지이미지"
            disabled={!editMode}
            ref={imageRef}
            resetDependency={reset}
            onChangeCallBack={setImage}
            inputInitialValue={book.image}
          />
          <SelectWithLabel
            labelText="카테고리"
            disabled={!editMode}
            ref={categoryRef}
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
            ref={callSignRef}
            resetDependency={reset}
            inputInitialValue={book.callSign}
          />
          <SelectWithLabel
            labelText="도서 상태"
            disabled={!editMode}
            ref={statusRef}
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
          color={editMode ? "red" : undefined}
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
};

export default BookManagementModalDetail;
