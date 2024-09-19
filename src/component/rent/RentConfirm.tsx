import { Book, User } from "../../type";
import { useRecoilValue } from "recoil";
import { userAtom } from "~/atom/userAtom";
import "../../asset/css/RentConfirm.css";

type Props = {
  selectedUser: User | null;
  selectedBooks: Book[];
  openModal: () => void;
};

const RentConfirm = ({ selectedUser, selectedBooks, openModal }: Props) => {
  const librarian = useRecoilValue(userAtom);

  const lendingLimit = (librarian && librarian.id === selectedUser?.id ? 4 : 2) - (selectedUser?.lendings.length || 0);

  const isLendable =
    selectedUser &&
    !selectedUser.isPenalty &&
    selectedBooks.length > 0 &&
    lendingLimit >= selectedBooks.length;
  return (
    <section className="rent__confirm-button">
      <div className="rent__confirm-button__text font-16 color-a4">
        {selectedUser && selectedBooks.length > 0
          ? (
          `${
              selectedUser.nickname ? selectedUser.nickname : selectedUser.email
            }님에게 ${selectedBooks.map((book, idx) => {
              if (idx !== 0)
                return (' ' + book.title)
              else
                return (book.title)
            })}
            를 대출합니다.`
          ): "정보를 입력해주세요."}
      </div>
      <button
        className={`rent__confirm-button__button ${
          isLendable ? "red" : "black"
        }-button color-ff`}
        type="button"
        disabled={!isLendable}
        onClick={openModal}
      >
        도서 대출하기
      </button>
    </section>
  );
};

export default RentConfirm;
