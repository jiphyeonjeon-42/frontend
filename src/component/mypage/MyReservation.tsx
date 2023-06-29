import { useGetUsersSearchId } from "../../api/users/useGetUsersSearchId";
import RentedOrReservedBooks from "./MyRentInfo/RentedOrReservedBooks";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import Reserve from "../../asset/img/list-check-solid.svg";
import { useRecoilValue } from "recoil";
import userState from "../../atom/userState";

const MyReservation = () => {
  const userId = useRecoilValue(userState).id;
  const { userInfo } = useGetUsersSearchId({ userId });

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
          />
        </div>
      </div>
    </>
  );
};

export default MyReservation;
