import { FormEventHandler, useState } from "react";
import Button from "../utils/Button";
import BookInformationWithCover from "../utils/BookInformationWithCover";
import TextWithLabel from "../utils/TextWithLabel";
import TextareaWithLabel from "../utils/TextareaWithLabel";
import { usePostLendingsMultiple } from "../../api/lendings/usePostLendingsMultiple";
import { Book, User } from "../../type";
import "../../asset/css/RentModalConfirm.css";

type Props = {
  selectedUser: User;
  selectedBooks: Book[];
  setSelectedUser: (user: User) => void;
  setSelectedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  closeModal: () => void;
};

const RentModalConfirm = ({
  selectedUser,
  selectedBooks,
  setSelectedUser,
  setSelectedBooks,
  closeModal,
}: Props) => {
  const [remarks, setRemarks] = useState<string[]>([]);

  const { requestLending } = usePostLendingsMultiple({
    selectedBooks,
    selectedUser,
    setSelectedBooks,
    setSelectedUser,
    closeModal,
  });

  const postData: FormEventHandler = e => {
    e.preventDefault();
    requestLending(remarks);
  };

  const isRentable =
    selectedBooks.length > 1
      ? remarks.slice(0, selectedBooks.length).every(remark => remark.length > 0)
      : remarks[0].length > 0;

  const handleRemarkChange = (index: number, value: string) => {
    const updatedRemarks = [...remarks];
    updatedRemarks[index] = value;
    setRemarks(updatedRemarks);
  };

  return (
    <form className="rent-modal">
      <div className="rent-modal__user">
        <p className="font-16 color-red">유저정보</p>
        {selectedUser && (
          <div className="rent-modal__user__detail">
            <p className="rent-modal__user__id font-28-bold color-54">
              {selectedUser.nickname
                ? selectedUser.nickname
                : selectedUser.email}
            </p>
            <p className="font-16 color-54">{`현재 대출권수 ( ${selectedUser.lendings.length} / ${selectedUser.role === 2 ? '4' : '2'} )`}</p>
          </div>
        )}
      </div>
      <div className="rent-modal__books">
        {selectedBooks.map((selectBook, index) => {
          const isFirst = index === 0;

          return (
            <div
              key={selectBook.bookId}
              className={`rent-modal__book-info ${index}`}
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
                  textareaValue={remarks[index]}
                  setTextareaValue={(value:string)=>handleRemarkChange(index, value)}
                  isTextareaFocusedOnMount={index===0}
                  isVisibleBottomMessage={!remarks[index]?.length}
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
