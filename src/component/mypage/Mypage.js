import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
          id: JSON.parse(window.localStorage.getItem("user")).id,
        },
      })
      .then(res =>
        setUserInfo(() => {
          const rtnObj = Object.assign(res.data.items[0]);
          switch (rtnObj.role) {
            case 1:
              rtnObj.role = "카뎃";
              break;
            case 2:
              rtnObj.role = "운영진";
              break;
            case 3:
              rtnObj.role = "사서";
              break;
            default:
              rtnObj.role = "미인증";
          }
          return rtnObj;
        }),
      );
  }, []);

  return (
    <>
      <ScrollTopButton rightRem={-10} bottomRem={5} />
      <div className="mypage-subtitle">
        <div className="mypage-subtitle__line" />
        <div className="mypage-subtitle__user__info">
          <div className="mypage-subtitle__titlebox">
            <div>
              <div className="mypage-subtitle__titlebox__title">
                <span className="color-2d">
                  {userInfo
                    ? `${
                        userInfo.nickname ? userInfo.nickname : userInfo.email
                      }님, 반갑습니다!`
                    : "-"}
                </span>
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
            <div className="mypage-inquire-box-short-clickBox">
              <a
                className="font-14-bold color-54"
                href={`${process.env.REACT_APP_API}/auth/getIntraAuthentication`}
              >
                42 인증하기
              </a>
              <Link
                to={{ pathname: "/mypage/edit/email" }}
                className="font-14-bold color-54"
              >
                이메일 변경
              </Link>
              <Link
                to={{ pathname: "/mypage/edit/pw" }}
                className="font-14-bold color-54"
              >
                비밀번호 변경
              </Link>
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
              {userInfo ? (
                <>
                  <span className="font-14-bold color-54">이메일</span>
                  <span className="font-14">{userInfo.email}</span>
                  <span className="font-14-bold color-54">역할</span>
                  <span className="font-14">{userInfo.role}</span>
                  <span className="font-14-bold color-54">슬랙ID</span>
                  <span className="font-14">{userInfo.slack}</span>
                  <span className="font-14-bold color-54">연체</span>
                  <span className="font-14">{`${userInfo.overDueDay}일`}</span>
                  <span className="font-14-bold color-54">업데이트</span>
                  <span className="font-14">
                    {userInfo.updatedAt.slice(0, 10)}
                  </span>
                </>
              ) : null}
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
          <MypageRentedBook rentInfo={userInfo ? userInfo.lendings : null} />
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
    </>
  );
};

export default Mypage;
