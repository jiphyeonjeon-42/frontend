import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/Mypage.css";
import qs from "qs";
import ScrollTopButton from "../utils/ScrollTopButton";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import Login from "../../img/login_icon_white.svg";
import Book from "../../img/admin_icon.svg";
import Reserve from "../../img/list-check-solid.svg";
import MypageRentedBook from "./MypageRentedBook";
import MypageReservedBook from "./MypageReservedBook";
import MiniModal from "../utils/MiniModal";
import ModalContentsOnlyTitle from "../utils/ModalContentsOnlyTitle";
import ModalContentsTitleWithMessage from "../utils/ModalContentsTitleWithMessage";
import getErrorMessage from "../../data/error";

const Mypage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [isMiniModalOpen, setIsMiniModalOpen] = useState(false);
  const [miniModalContent, setMiniModalContent] = useState("");
  const [deviceMode, setDeviceMode] = useState(window.innerWidth);
  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const [queryErrorCode, setQueryErrorCode] = useState(query.errorCode);

  const getUserInfo = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/search`, {
        params: {
          id: JSON.parse(window.localStorage.getItem("user")).id,
        },
      })
      .then(res => setUserInfo(res.data.items[0]))
      .catch(err => {
        const { errorCode } = err.response.data;
        setMiniModalContent(getErrorMessage(errorCode));
        setIsMiniModalOpen(true);
      });
  };

  const closeModal = async () => {
    if (isMiniModalOpen) {
      await getUserInfo();
      setIsMiniModalOpen(false);
    } else if (queryErrorCode) {
      setQueryErrorCode(null);
      navigate("/mypage");
    }
  };

  const convertRoleToStr = roleInt => {
    switch (roleInt) {
      case 1:
        return "카뎃";
      case 2:
        return "사서";
      case 3:
        return "운영진";
      default:
        return "미인증";
    }
  };

  useEffect(async () => {
    if (JSON.parse(window.localStorage.getItem("user")).isLogin)
      await getUserInfo();
    else navigate("/login");
  }, []);

  useEffect(() => {
    const getWindowWidth = () => {
      if (window.innerWidth >= 1200) setDeviceMode("desktop");
      if (window.innerWidth < 1200 && window.innerWidth > 767)
        setDeviceMode("pad");
      if (window.innerWidth < 767) setDeviceMode("mobile");
    };
    window.addEventListener("resize", getWindowWidth);
    return () => {
      window.removeEventListener("resize", getWindowWidth);
    };
  }, []);

  const [title, content] = getErrorMessage(parseInt(queryErrorCode, 10)).split(
    "\r\n",
  );

  const concatDate = day => {
    let overDueDate = "";

    day.setDate(day.getDate() + userInfo.overDueDay);
    overDueDate += day.getFullYear();
    overDueDate += "-";
    overDueDate +=
      day.getMonth() + 1 >= 10
        ? day.getMonth() + 1
        : "0".concat(day.getMonth() + 1);
    overDueDate += "-";
    overDueDate +=
      day.getDate() >= 10 ? day.getDate() : "0".concat(day.getDate());
    return overDueDate;
  };

  const getOverDueDate = () => {
    if (
      !userInfo.penaltyEndDate ||
      new Date(userInfo.penaltyEndDate).setHours(0, 0, 0, 0) <
        new Date().setHours(0, 0, 0, 0)
    ) {
      return concatDate(new Date());
    }
    return concatDate(new Date(userInfo.penaltyEndDate));
  };

  return (
    <>
      {deviceMode === "desktop" && (
        <ScrollTopButton rightRem={-10} bottomRem={5} />
      )}
      <div className="mypage-subtitle">
        <div className="mypage-subtitle__line" />
        <div className="mypage-subtitle__user__info">
          <div className="mypage-subtitle__titlebox">
            <div>
              <div className="mypage-subtitle__titlebox__title">
                <span className="color-2d">
                  {userInfo && userInfo.email
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
                  <span className="font-14">
                    {userInfo.email ? userInfo.email : "-"}
                  </span>
                  <span className="font-14-bold color-54">역할</span>
                  <span className="font-14">
                    {userInfo.role ? convertRoleToStr(userInfo.role) : "-"}
                  </span>
                  <span className="font-14-bold color-54">슬랙ID</span>
                  <span className="font-14">
                    {userInfo.slack ? userInfo.slack : "-"}
                  </span>
                  <span className="font-14-bold color-54">대출제한</span>
                  <span className="font-14">
                    {userInfo.overDueDay ||
                    (userInfo.penaltyEndDate &&
                      new Date(userInfo.penaltyEndDate).setHours(0, 0, 0, 0) >=
                        new Date().setHours(0, 0, 0, 0))
                      ? `${getOverDueDate()} 까지`
                      : "-"}
                  </span>
                  <span className="font-14-bold color-54">정보수정</span>
                  <span className="font-14">
                    {userInfo.updatedAt ? userInfo.updatedAt.slice(0, 10) : "-"}
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
            setIsMiniModalOpen={setIsMiniModalOpen}
            setMiniModalContent={setMiniModalContent}
          />
        </div>
      </div>
      {isMiniModalOpen ? (
        <MiniModal closeModal={closeModal}>
          <ModalContentsOnlyTitle
            closeModal={closeModal}
            title={miniModalContent}
          />
        </MiniModal>
      ) : null}
      {queryErrorCode && (
        <MiniModal closeModal={closeModal}>
          <ModalContentsTitleWithMessage
            closeModal={closeModal}
            title={title}
            message={content}
          />
        </MiniModal>
      )}
    </>
  );
};

export default Mypage;
