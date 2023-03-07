import React, { useState } from "react";

import Banner from "../utils/Banner";
import Tabs from "../utils/Tabs";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import RentInquireBoxUser from "./RentInquireBoxUser";
import RentInquireBoxBook from "./RentInquireBoxBook";
import RentConfirm from "./RentConfirm";
import RentModalConfirm from "./RentModalConfirm";

import useDialog from "../../hook/useDialog";
import useModal from "../../hook/useModal";

import Login from "../../img/login_icon_white.svg";
import Book from "../../img/admin_icon.svg";

import { rentTabList } from "../../data/tablist";
import "../../css/Rent.css";

const Rent = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);

  const { Dialog, setOpenTitleAndMessage } = useDialog();
  const { Modal, setOpen: openModal, setClose: closeModal } = useModal();

  return (
    <main>
      <Banner img="admin" titleKo="대출" titleEn="RENT BOOK" />
      <Tabs tabList={rentTabList} />
      <section className="inquire-box__wrapper">
        <InquireBoxTitle
          Icon={Login}
          titleKO="카뎃 정보"
          titleEN="Cadet info"
        />
        <RentInquireBoxUser
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </section>
      <section className="inquire-box__wrapper">
        <InquireBoxTitle Icon={Book} titleKO="도서 정보" titleEN="Book info" />
        {selectedBooks.length > 0
          ? selectedBooks.map((book, index) => (
              <RentInquireBoxBook
                key={book.id}
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
      <Modal>
        <RentModalConfirm
          selectedUser={selectedUser}
          selectedBooks={selectedBooks}
          setSelectedBooks={setSelectedBooks}
          setSelectedUser={setSelectedUser}
          closeModal={closeModal}
          setError={setOpenTitleAndMessage}
        />
      </Modal>
      <Dialog />
    </main>
  );
};

export default Rent;
