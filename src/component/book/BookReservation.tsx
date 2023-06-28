import Image from "../utils/Image";
import useGetReservationsCount from "../../api/reservations/useGetReservationsCount";
import usePostReservations from "../../api/reservations/usePostReservations";
import Available from "../../asset/img/arrow_right_res.svg";
import Unavailable from "../../asset/img/arrow_right_res_default.svg";
import "../../asset/css/Reservation.css";

type Props = {
  bookInfoId: number;
  isAvailableReservation: boolean;
  dialogDefaultConfig: {};
  setDialogConfig: () => void;
  setOpenTitleAndMessage: (
    title: string,
    message: string,
    afterClose?: () => void,
  ) => void;
  openDialog: () => void;
};

const BookReservation = ({
  bookInfoId,
  isAvailableReservation,
  dialogDefaultConfig,
  setDialogConfig,
  setOpenTitleAndMessage,
  openDialog,
}: Props) => {
  if (!isAvailableReservation)
    return (
      <div className="reservation__rentable">
        대출 가능
        <Image src={Unavailable} alt="대출" />
      </div>
    );

  const { postReservation } = usePostReservations({
    bookInfoId,
    dialogDefaultConfig,
    setDialogConfig,
    openDialog,
    setOpenTitleAndMessage,
  });

  const { getCountReservation } = useGetReservationsCount({
    bookInfoId,
    dialogDefaultConfig,
    setDialogConfig,
    openDialog,
    setOpenTitleAndMessage,
    postReservation,
  });

  const tryReservation = getCountReservation;

  return (
    <>
      <button
        className="reservation__button"
        type="button"
        onClick={tryReservation}
      >
        예약 하기
        <Image src={Available} alt="예약" />
      </button>
    </>
  );
};

export default BookReservation;
