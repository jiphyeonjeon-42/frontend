import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import Modal, { isModalOpen } from "./Modal";
import BackGround from "../utils/BackGround";
import Title from "../utils/Title";
import SubTitle from "../utils/SubTitle";
import InquireBoxTitle from "../utils/InquireBoxTitle";
// import MiniModal from "../utils/MiniModal";
import RentButton from "./RentButton";
import Login from "../../img/login_icon.svg";
import Book from "../../img/admin_icon.svg";
import "../../css/Rent.css";
import InquireBoxUser from "./InquireBoxUser";
import InquireBoxBook from "./InquireBoxBook";

const Rent = () => {
  const userModal = useRecoilValue(isModalOpen);
  const [selectUser, setSelectUser] = useState(null);
  const [selectBooks, setSelectBooks] = useState([]);
  //   const [miniModal, setMiniModal] = useState(false);

  //   const closeModal = () => {
  //     setMiniModal(false);
  //   };

  return (
    <main>
      <BackGround page="admin" />
      <section className="rent-title">
        <Title titleKorean="대출" titleEng="RENT BOOK" />
      </section>
      <div className="rent-subtitle">
        <SubTitle
          subTitle="대출에 필요한 정보를 입력해주세요"
          description="카뎃정보, 도서정보, 비고사항을 입력해주세요"
          alignItems="center"
        />
      </div>
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
        // setModal={setMiniModal}
      />
      {userModal !== 0 ? (
        <Modal
          setSelectUser={setSelectUser}
          setSelectBooks={setSelectBooks}
          selectBooks={selectBooks}
        />
      ) : null}
      {/* {miniModal && (
        <MiniModal handleModal={closeModal} typeProps="confirm" bookId={id} />
      )} */}
    </main>
  );
};

export default Rent;
