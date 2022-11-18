// import React, { useEffect, useState } from "react";
import React from "react";
// import { Link, useSearchParams } from "react-router-dom";
import useDialog from "../../hook/useDialog";
import useGetUsersSearchId from "../../api/users/useGetUsersSearchId";
import RentedOrReservedBooks from "./RentedOrReservedBooks";
// import ScrollTopButton from "../utils/ScrollTopButton";
import InquireBoxTitle from "../utils/InquireBoxTitle";
// import getErrorMessage from "../../data/error";
// import Login from "../../img/login_icon_white.svg";
// import Book from "../../img/admin_icon.svg";
import Reserve from "../../img/list-check-solid.svg";
// import "../../css/Mypage.css";

const MyRent = () => {
  console.log("Success myRent");
  // const [urlQuery, setUrlQuery] = useSearchParams();
  const {
    setOpen: openDialog,
    config: dialogConfig,
    setConfig: setDialogConfig,
    setOpenTitleAndMessage: setDialogTitleAndMessage,
    Dialog,
  } = useDialog();

  const userId = JSON.parse(window.localStorage.getItem("user")).id;
  const { userInfo } = useGetUsersSearchId({
    setDialogTitleAndMessage,
    userId,
  });
  // const [deviceMode, setDeviceMode] = useState(window.innerWidth);

  // const convertRoleToStr = roleInt => {
  //   switch (roleInt) {
  //     case 1:
  //       return "카뎃";
  //     case 2:
  //       return "사서";
  //     case 3:
  //       return "운영진";
  //     default:
  //       return "미인증";
  //   }
  // };

  // useEffect(() => {
  //   const error = urlQuery.get("errorCode");
  //   if (error) {
  //     const errorCode = parseInt(error, 10);
  //     const [title, message] = getErrorMessage(errorCode).split("\r\n");
  //     setDialogTitleAndMessage(title, message, () => {
  //       urlQuery.delete("errorCode");
  //       setUrlQuery(urlQuery);
  //     });
  //   }

  //   const getWindowWidth = () => {
  //     if (window.innerWidth >= 1200) setDeviceMode("desktop");
  //     if (window.innerWidth < 1200 && window.innerWidth > 767)
  //       setDeviceMode("pad");
  //     if (window.innerWidth < 767) setDeviceMode("mobile");
  //   };
  //   window.addEventListener("resize", getWindowWidth);
  //   return () => {
  //     window.removeEventListener("resize", getWindowWidth);
  //   };
  // }, []);

  // const concatDate = day => {
  //   let overDueDate = "";

  //   day.setDate(day.getDate() + userInfo.overDueDay);
  //   overDueDate += day.getFullYear();
  //   overDueDate += "-";
  //   overDueDate +=
  //     day.getMonth() + 1 >= 10
  //       ? day.getMonth() + 1
  //       : "0".concat(day.getMonth() + 1);
  //   overDueDate += "-";
  //   overDueDate +=
  //     day.getDate() >= 10 ? day.getDate() : "0".concat(day.getDate());
  //   return overDueDate;
  // };

  // const getOverDueDate = () => {
  //   if (
  //     !userInfo.penaltyEndDate ||
  //     new Date(userInfo.penaltyEndDate).setHours(0, 0, 0, 0) <
  //       new Date().setHours(0, 0, 0, 0)
  //   ) {
  //     return concatDate(new Date());
  //   }
  //   return concatDate(new Date(userInfo.penaltyEndDate));
  // };

  return (
    <>
      <div className="mypage-inquire-box-long-wrapper">
        <InquireBoxTitle
          Icon={Reserve}
          titleKO="예약 정보"
          titleEN="reservation data"
          KOsize="font-20-bold"
          ENsize="font-14"
        />
        <div className="mypage-inquire-box-long">
          <RentedOrReservedBooks
            componentMode="reserve"
            bookInfoArr={userInfo ? userInfo.reservations : null}
            openDialog={openDialog}
            dialogConfig={dialogConfig}
            setDialogConfig={setDialogConfig}
          />
        </div>
      </div>
      <Dialog />
    </>
  );
};

export default MyRent;
