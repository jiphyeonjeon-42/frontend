import { memo } from 'react';
import { Book } from "../../type";
import BookInformationWithCover from "../utils/BookInformationWithCover";
import TextWithLabel from "../utils/TextWithLabel";
import TextareaWithLabel from "../utils/TextareaWithLabel";

interface RentModalBooksProps {
  selectedBooks: Book[];
  handleRemarkChange: (index: number, value: string) => void;
  remarksRef: React.MutableRefObject<string[]>;
}

const RentModalBooks = ({ selectedBooks, handleRemarkChange, remarksRef }: RentModalBooksProps) => {
  return (
    <div className="rent-modal__books">
      {selectedBooks.map((selectBook, index) => (
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
              setTextareaValue={(value: string) => handleRemarkChange(index, value)}
              isTextareaFocusedOnMount={index === 0}
              isVisibleBottomMessage={!remarksRef.current[index]?.length}
              bottomMessageText="비고를 입력해주세요"
              bottomMessageColor="red"
            />
          </BookInformationWithCover>
        </div>
      ))}
    </div>
  );
};

export default memo(RentModalBooks); 