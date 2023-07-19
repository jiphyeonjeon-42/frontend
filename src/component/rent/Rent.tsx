import { useState } from "react";
import { useModal } from "../../hook/useModal";
import { rentTabList } from "../../constant/tablist";
import { Book, User } from "../../type";
import Banner from "../utils/Banner";
import Tabs from "../utils/Tabs";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import RentInquireBoxUser from "./RentInquireBoxUser";
import RentInquireBoxBook from "./RentInquireBoxBook";
import RentConfirm from "./RentConfirm";
import RentModalConfirm from "./RentModalConfirm";
import LoginIcon from "../../asset/img/login_icon_white.svg";
import BookIcon from "../../asset/img/admin_icon.svg";
import "../../asset/css/Rent.css";

const Rent = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);

  const { Modal, setOpen: openModal, setClose: closeModal } = useModal();

  return (
    <main>
      <Banner img="admin" titleKo="대출" titleEn="RENT BOOK" />
      <Tabs tabList={rentTabList} />
      <section className="inquire-box__wrapper">
        <InquireBoxTitle
          Icon={LoginIcon}
          titleKO="카뎃 정보"
          titleEN="Cadet info"
        />
        <RentInquireBoxUser
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </section>
      <section className="inquire-box__wrapper">
        <InquireBoxTitle
          Icon={BookIcon}
          titleKO="도서 정보"
          titleEN="Book info"
        />
        {selectedBooks.length > 0
          ? selectedBooks.map((book, index) => (
              <RentInquireBoxBook
                key={book.bookId}
                book={book}
                shape={
                  selectedBooks.length === 2 && index === 0 ? "none" : "two"
                }
                selectedBooks={selectedBooks}
                setSelectedBooks={setSelectedBooks}
              />
            ))
          : null}
        {selectedBooks.length < 2 ? (
          <RentInquireBoxBook
            book={null}
            shape={selectedBooks.length === 0 ? "two" : "four"}
            selectedBooks={selectedBooks}
            setSelectedBooks={setSelectedBooks}
          />
        ) : null}
      </section>
      <RentConfirm
        selectedUser={selectedUser}
        selectedBooks={selectedBooks}
        openModal={openModal}
      />
      {selectedUser && selectedBooks.length > 0 ? (
        <Modal>
          <RentModalConfirm
            selectedUser={selectedUser}
            selectedBooks={selectedBooks}
            setSelectedBooks={setSelectedBooks}
            setSelectedUser={setSelectedUser}
            closeModal={closeModal}
          />
        </Modal>
      ) : null}
    </main>
  );
};

export default Rent;
