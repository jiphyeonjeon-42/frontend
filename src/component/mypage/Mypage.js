import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
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
  const history = useHistory();
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
      history.push("/mypage");
    }
  };

  const convertRoleToStr = roleInt => {
    switch (roleInt) {
      case 1:
        return "??????";
      case 2:
        return "??????";
      case 3:
        return "?????????";
      default:
        return "?????????";
    }
  };

  useEffect(async () => {
    if (JSON.parse(window.localStorage.getItem("user")).isLogin)
      await getUserInfo();
    else history.push("/login");
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
                      }???, ???????????????!`
                    : "-"}
                </span>
              </div>
              <div>
                <p className="mypage-subtitle__titlebox__guide__1 font-14 color-2d">
                  ???????????? ????????? ??????????????????.
                </p>
                <p className="mypage-subtitle__titlebox__guide__2 font-14 color-2d">
                  ???????????? ?????? ??? ??????, ?????? ?????? ????????? ???????????????.
                </p>
              </div>
            </div>
            <div className="mypage-inquire-box-short-clickBox">
              <a
                className="font-14-bold color-54"
                href={`${process.env.REACT_APP_API}/auth/getIntraAuthentication`}
              >
                42 ????????????
              </a>
              <Link
                to={{ pathname: "/mypage/edit/email" }}
                className="font-14-bold color-54"
              >
                ????????? ??????
              </Link>
              <Link
                to={{ pathname: "/mypage/edit/pw" }}
                className="font-14-bold color-54"
              >
                ???????????? ??????
              </Link>
            </div>
          </div>
          <div className="mypage-inquire-box-short-wrapper">
            <InquireBoxTitle
              Icon={Login}
              titleKO="?????? ??????"
              titleEN="user data"
              KOsize="font-20-bold"
              ENsize="font-14"
            />
            <div className="mypage-inquire-box-short">
              {userInfo ? (
                <>
                  <span className="font-14-bold color-54">?????????</span>
                  <span className="font-14">
                    {userInfo.email ? userInfo.email : "-"}
                  </span>
                  <span className="font-14-bold color-54">??????</span>
                  <span className="font-14">
                    {userInfo.role ? convertRoleToStr(userInfo.role) : "-"}
                  </span>
                  <span className="font-14-bold color-54">??????ID</span>
                  <span className="font-14">
                    {userInfo.slack ? userInfo.slack : "-"}
                  </span>
                  <span className="font-14-bold color-54">????????????</span>
                  <span className="font-14">
                    {userInfo.overDueDay ||
                    (userInfo.penaltyEndDate &&
                      new Date(userInfo.penaltyEndDate).setHours(0, 0, 0, 0) >=
                        new Date().setHours(0, 0, 0, 0))
                      ? `${getOverDueDate()} ??????`
                      : "-"}
                  </span>
                  <span className="font-14-bold color-54">????????????</span>
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
          titleKO="?????? ??????"
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
          titleKO="?????? ??????"
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
