import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import Modal, { isModalOpen } from "./Modal";
import Banner from "../utils/Banner";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import RentModal from "./RentModal";
import RentButton from "./RentButton";
import Login from "../../img/login_icon_white.svg";
import Book from "../../img/admin_icon.svg";
import "../../css/Rent.css";
import InquireBoxUser from "./InquireBoxUser";
import InquireBoxBook from "./InquireBoxBook";
import AdminTabs from "../utils/AdminTabs";

const Rent = () => {
  const userModal = useRecoilValue(isModalOpen);
  const [selectUser, setSelectUser] = useState(null);
  const [selectBooks, setSelectBooks] = useState([]);
  const [midModal, setMidModal] = useState(false);

  const closeModal = () => {
    setMidModal(false);
  };

  return (
    <main>
      <Banner img="admin" titleKo="대출" titleEn="RENT BOOK" />
      <AdminTabs />
      <div className="inquire-box-wrapper">
        <InquireBoxTitle
          Icon={Login}
          titleKO="카뎃 정보"
          titleEN="Cadet info"
        />
        <InquireBoxUser selectUser={selectUser} setSelectUser={setSelectUser} />
      </div>
      <div className="inquire-box-wrapper">
        <InquireBoxTitle Icon={Book} titleKO="도서 정보" titleEN="Book info" />
        {selectBooks.length > 0
          ? selectBooks.map((book, index) => (
              <InquireBoxBook
                key={book.id}
                book={book}
                shape={selectBooks.length === 2 && index === 0 ? "none" : "two"}
                selectBooks={selectBooks}
                setSelectBooks={setSelectBooks}
              />
            ))
          : null}
        {selectBooks.length < 2 ? (
          <InquireBoxBook
            book={null}
            shape={selectBooks.length === 0 ? "two" : "four"}
            selectBooks={selectBooks}
            setSelectBooks={setSelectBooks}
          />
        ) : null}
      </div>
      <RentButton
        selectUser={selectUser}
        selectBooks={selectBooks}
        setModal={setMidModal}
      />
      {userModal !== 0 ? (
        <Modal
          setSelectUser={setSelectUser}
          setSelectBooks={setSelectBooks}
          selectBooks={selectBooks}
        />
      ) : null}
      {midModal && (
        <RentModal
          selectUser={selectUser}
          selectBooks={selectBooks}
          handleModal={closeModal}
        />
      )}
    </main>
  );
};

export default Rent;
