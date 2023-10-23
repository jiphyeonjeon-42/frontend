import { useGetUsersSearchId } from "~/api/users/useGetUsersSearchId";
import RentedOrReservedBooks from "./MyRentInfo/RentedOrReservedBooks";
import InquireBoxTitle from "~/component/utils/InquireBoxTitle";
import Reserve from "~/asset/img/list-check-solid.svg";
import { useRecoilValue } from "recoil"
import { userIdAtom } from "~/atom/userAtom"

const MyReservation = () => {
  const userId = useRecoilValue(userIdAtom);
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
