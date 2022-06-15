import React from "react";
import Banner from "../utils/Banner";
import "../../css/Mypage.css";
import ScrollTopButton from "../utils/ScrollTopButton";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import Login from "../../img/login_icon_white.svg";
import Book from "../../img/admin_icon.svg";
import Reserve from "../../img/list-check-solid.svg";
import MypageRentedBook from "./MypageRentedBook";
import MypageReservedBook from "./MypageReservedBook";

const Mypage = () => {
  return (
    <main>
      <Banner img="mypage" titleKo="마이페이지" titleEn="MYPAGE" />
      <div className="mypage-wrapper">
        <section className="mypage-section">
          <ScrollTopButton rightRem={-10} bottomRem={5} />
          <div className="mypage-subtitle">
            <div className="mypage-subtitle__line" />
            <div className="mypage-subtitle__titlebox">
              <div className="mypage-subtitle__titlebox__title">
                Kyungsle님, 반갑습니다!
              </div>
              <div className="mypage-inquire-box-short-wrapper">
                <InquireBoxTitle
                  Icon={Login}
                  titleKO="유저 정보"
                  titleEN="user data"
                  KOsize="font-20-bold"
                  ENsize="font-14"
                />
                <div className="mypage-inquire-box-short">
                  <div className="mypage-inquire-box-short-overdue">
                    <span className="font-14-bold">연체</span>
                    <span className="font-14">42일</span>
                  </div>
                  <div className="mypage-inquire-box-short-clickBox">
                    <span className="font-14-bold">42 인증하기</span>
                    <span className="font-14-bold">이메일 변경</span>
                    <span className="font-14-bold">비밀번호 변경</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mypage-inquire-box-long-wrapper">
            <InquireBoxTitle
              Icon={Book}
              titleKO="대출 정보"
              titleEN="rent data"
              KOsize="font-20-bold"
              ENsize="font-14"
            />
            <div className="mypage-inquire-box-long">
              <MypageRentedBook />
            </div>
          </div>
          <div className="mypage-inquire-box-long-wrapper">
            <InquireBoxTitle
              Icon={Reserve}
              titleKO="예약 정보"
              titleEN="reservation data"
              KOsize="font-20-bold"
              ENsize="font-14"
            />
            <div className="mypage-inquire-box-long">
              <MypageReservedBook />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Mypage;
