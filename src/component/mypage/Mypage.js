import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [userInfo, setUserInfo] = useState(null);

  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/search`, {
        params: {
          nickname: JSON.parse(window.localStorage.getItem("user")).userId,
        },
      })
      .then(res => setUserInfo(res.data.items[0]));
  }, []);

  console.log(userInfo);

  return (
    <main>
      <Banner img="mypage" titleKo="마이페이지" titleEn="MYPAGE" />
      <div className="mypage-wrapper">
        <section className="mypage-section">
          <ScrollTopButton rightRem={-10} bottomRem={5} />
          <div className="mypage-subtitle">
            <div className="mypage-subtitle__line" />
            <div className="mypage-subtitle__user__info">
              <div className="mypage-subtitle__titlebox">
                <div className="mypage-subtitle__titlebox__title">
                  {userInfo
                    ? `${
                        userInfo.nickname ? userInfo.nickname : userInfo.email
                      }님, 반갑습니다!`
                    : "-"}
                </div>
                <div>
                  <p className="mypage-subtitle__titlebox__guide__1 font-14 color-2d">
                    회원님의 정보를 확인해보세요.
                  </p>
                  <p className="mypage-subtitle__titlebox__guide__2 font-14 color-2d">
                    개인정보 변경 및 대출, 예약 내역 확인이 가능합니다.
                  </p>
                </div>
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
                    <span className="font-14-bold color-2d">연체</span>
                    <span className="font-14">
                      {userInfo ? `${userInfo.overDueDay}일` : "0일"}
                    </span>
                  </div>
                  <div className="mypage-inquire-box-short-clickBox">
                    <span className="font-14-bold color-2d">42 인증하기</span>
                    <span className="font-14-bold color-2d">이메일 변경</span>
                    <span className="font-14-bold color-2d">비밀번호 변경</span>
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
              <MypageRentedBook
                rentInfo={userInfo ? userInfo.lendings : null}
              />
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
              <MypageReservedBook
                reserveInfo={userInfo ? userInfo.reservations : null}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Mypage;
