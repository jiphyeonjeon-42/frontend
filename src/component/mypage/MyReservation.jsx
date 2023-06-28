import useDialog from "../../hook/useDialog";
import useGetUsersSearchId from "../../api/users/useGetUsersSearchId";
import RentedOrReservedBooks from "./MyRentInfo/RentedOrReservedBooks";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import Reserve from "../../asset/img/list-check-solid.svg";

const MyReservation = () => {
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

export default MyReservation;
