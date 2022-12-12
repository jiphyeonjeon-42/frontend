import React from "react";
import RentHistory from "./RentHistory";
import useDialog from "../../../hook/useDialog";
import useGetUsersSearchId from "../../../api/users/useGetUsersSearchId";
import RentedOrReservedBooks from "./RentedOrReservedBooks";
import InquireBoxTitle from "../../utils/InquireBoxTitle";
import Book from "../../../img/admin_icon.svg";

const MyRent = () => {
  const { setOpenTitleAndMessage: setDialogTitleAndMessage, Dialog } =
    useDialog();

  const userId = JSON.parse(window.localStorage.getItem("user")).id;
  const { userInfo } = useGetUsersSearchId({
    setDialogTitleAndMessage,
    userId,
  });

  return (
    <>
      <div className="mypage-inquire-box-long-wrapper">
        <InquireBoxTitle
          Icon={Book}
          titleKO="대출 정보"
          titleEN="rent data"
          KOsize="font-20-bold"
          ENsize="font-14"
        />
        <div className="mypage-inquire-box-long">
          <RentedOrReservedBooks
            componentMode="rent"
            bookInfoArr={userInfo ? userInfo.lendings : null}
          />
        </div>
        <InquireBoxTitle
          Icon={Book}
          titleKO="이전 대출기록"
          titleEN="rent history"
          KOsize="font-20-bold"
          ENsize="font-14"
        />
        <div className="mypage-inquire-box-long">
          <RentHistory />
        </div>
      </div>
      <Dialog />
    </>
  );
};

export default MyRent;
