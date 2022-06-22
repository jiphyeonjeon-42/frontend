import React, { useState } from "react";

import Banner from "../utils/Banner";
import AdminTabs from "../utils/AdminTabs";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import RentInquireBoxUser from "./RentInquireBoxUser";
import RentInquireBoxBook from "./RentInquireBoxBook";
import RentModal from "./RentModal";
import RentConfirm from "./RentConfirm";

import Login from "../../img/login_icon_white.svg";
import Book from "../../img/admin_icon.svg";

import "../../css/Rent.css";

const Rent = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [midModalContents, setMidModalContents] = useState("");
  const tabList = [
    { name: "대출", link: "/rent" },
    { name: "예약대출", link: "/reservation" },
    { name: "반납", link: "/return" },
  ];

  return (
    <main>
      <Banner img="admin" titleKo="대출" titleEn="RENT BOOK" />
      <AdminTabs tabList={tabList} />
      <section className="inquire-box__wrapper">
        <InquireBoxTitle
          Icon={Login}
          titleKO="카뎃 정보"
          titleEN="Cadet info"
        />
        <RentInquireBoxUser
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setMidModalContents={setMidModalContents}
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
                setMidModalContents={setMidModalContents}
              />
            ))
          : null}
        {selectedBooks.length < 2 ? (
          <RentInquireBoxBook
            book={null}
            shape={selectedBooks.length === 0 ? "two" : "four"}
            selectedBooks={selectedBooks}
            setSelectedBooks={setSelectedBooks}
            setMidModalContents={setMidModalContents}
          />
        ) : null}
      </section>
      <RentConfirm
        selectedUser={selectedUser}
        selectedBooks={selectedBooks}
        setMidModalContents={setMidModalContents}
      />
      {midModalContents && (
        <RentModal
          selectedUser={selectedUser}
          selectedBooks={selectedBooks}
          midModalContents={midModalContents}
          setSelectedUser={setSelectedUser}
          setSelectedBooks={setSelectedBooks}
          setMidModalContents={setMidModalContents}
        />
      )}
    </main>
  );
};

export default Rent;
