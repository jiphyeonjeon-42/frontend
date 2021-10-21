import React, { useState } from "react";
import BackGround from "../utils/BackGround";
import Title from "../utils/Title";
import "../../css/ReturnBook.css";
import SubTitle from "../utils/SubTitle";
import MidModal from "../utils/MidModal";

const ReturnBook = () => {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <main className="returnbook-main">
      <BackGround page="admin" />
      <section>
        <div className="returnbook-title">
          <Title titleKorean="조회 및 반납" titleEng="INQUIRE & RETURN BOOK" />
        </div>
        <div className="returnbook-subtitle">
          <SubTitle
            subTitle="대출에 필요한 정보를 입력해주세요."
            description="카뎃정보, 도서정보, 비고사항을 입력해주세요"
            alignItems="center"
          />
        </div>
      </section>
      <section className="returnbook-body">
        <div>hihihi</div>
      </section>
      <button type="button" onClick={openModal}>
        반납
      </button>
      {modal && <MidModal lendingId={2} handleModal={closeModal} />}
    </main>
  );
};

export default ReturnBook;
