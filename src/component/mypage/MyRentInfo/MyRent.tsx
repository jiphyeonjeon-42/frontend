import RentHistory from "./RentHistory";
import { useGetUsersSearchId } from "../../../api/users/useGetUsersSearchId";
import RentedOrReservedBooks from "./RentedOrReservedBooks";
import InquireBoxTitle from "../../utils/InquireBoxTitle";
import Book from "../../../asset/img/admin_icon.svg";

const MyRent = () => {
  const user = window.localStorage.getItem("user");
  const userId = user && JSON.parse(user).id;
  const { userInfo } = useGetUsersSearchId({ userId });

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
    </>
  );
};

export default MyRent;
