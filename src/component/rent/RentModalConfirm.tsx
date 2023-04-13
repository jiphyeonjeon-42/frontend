import { useState } from "react";
import Button from "../utils/Button";
import BookInformationWithCover from "../utils/BookInformationWithCover";
import TextWithLabel from "../utils/TextWithLabel";
import TextareaWithLabel from "../utils/TextareaWithLabel";
import "../../css/RentModalConfirm.css";
import usePostLendingsMultiple from "../../api/lendings/usePostLendingsMultiple";

type RentModalConfirmProps = {
  selectedUser: Record<string, unknown>;
  selectedBooks: object[];
  setSelectedUser(...args: unknown[]): unknown;
  setSelectedBooks(...args: unknown[]): unknown;
  setError(...args: unknown[]): unknown;
  closeModal(...args: unknown[]): unknown;
};

const RentModalConfirm = ({
  selectedUser,
  selectedBooks,
  setSelectedUser,
  setSelectedBooks,
  setError,
  closeModal,
}: RentModalConfirmProps) => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  const { requestLending } = usePostLendingsMultiple({
    selectedBooks,
    selectedUser,
    setSelectedBooks,
    setSelectedUser,
    setError,
    closeModal,
  });

  const postData = e => {
    e.preventDefault();
    requestLending([first, second]);
  };
  const isRentable =
    selectedBooks.length > 1
      ? first.length > 0 && second.length > 0
      : first.length > 0;

  return (
    <form className="rent-modal">
      <div className="rent-modal__user">
        <p className="font-16 color-red">유저정보</p>
        <div className="rent-modal__user__detail">
          <p className="rent-modal__user__id font-28-bold color-54">
            {selectedUser.nickname ? selectedUser.nickname : selectedUser.email}
          </p>
          <p className="font-16 color-54">{`현재 대출권수 ( ${selectedUser.lendings.length} / 2 )`}</p>
        </div>
      </div>
      <div className="rent-modal__books">
        {selectedBooks.map((selectBook, index) => {
          const isFirst = index === 0;

          return (
            <div
              key={selectBook.bookId}
              className={`rent-modal__book-info ${isFirst && "second-book"}`}
            >
              <BookInformationWithCover
                bookCoverAlt={selectBook.title}
                bookCoverImg={selectBook.image}
              >
                <TextWithLabel
                  wrapperClassName="rent-modal__book"
                  topLabelText="도서정보"
                  mainText={selectBook.title}
                  bottomLabelText={`청구기호 : ${selectBook.callSign}`}
                />
                <TextareaWithLabel
                  wrapperClassName="rent-modal__remark"
                  topLabelText="비고"
                  textareaPlaceHolder="비고를 입력해주세요. (책 상태 등)"
                  textareaValue={isFirst ? first : second}
                  setTextareaValue={isFirst ? setFirst : setSecond}
                  isTextareaFocusedOnMount={isFirst}
                  isVisibleBottomMessage={
                    isFirst ? !first.length : !second.length
                  }
                  bottomMessageText="비고를 입력해주세요"
                  bottomMessageColor="red"
                />
              </BookInformationWithCover>
            </div>
          );
        })}
      </div>
      <div className="rent-modal__buttons">
        <Button
          type="submit"
          value="대출 완료하기"
          onClick={postData}
          disabled={!isRentable}
          color={isRentable ? "red" : "lightgrey2"}
        />
        <Button
          value="취소하기"
          className="rent-modal__cancel"
          onClick={closeModal}
        />
      </div>
    </form>
  );
};

export default RentModalConfirm;
