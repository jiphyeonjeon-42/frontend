import React from "react";
import BackGround from "./BackGround";
import Title from "./Title";
import "../css/ReservedLoan.css";
import SubTitle from "./SubTitle";

const ReservedLoan = () => {
  return (
    <main className="reservedLoan-main">
      <BackGround page="admin" />
      <section>
        <div className="reservedLoan-title">
          <Title titleKorean="예약 대출" titleEng="BOOK RESERVATION" />
        </div>
        <div className="reservedLoan-subtitle">
          <SubTitle
            subTitle="예약대출에 필요한 정보를 입력해주세요."
            description="검색어를 입력하여 예약대출 현황을 확인하세요."
            alignItems="center"
          />
        </div>
      </section>
      <section className="reservedLoan-body">
        <div>hihihi</div>
      </section>
    </main>
  );
};

export default ReservedLoan;
