import { setErrorDialog } from "../../data/error";
import useApi from "../../hook/useApi";

const useGetReservationsCount = ({
  bookInfoId,
  dialogDefaultConfig,
  setDialogConfig,
  openDialog,
  setOpenTitleAndMessage,
  postReservation,
}) => {
  const { request } = useApi("get", "reservations/count", {
    bookInfo: bookInfoId,
  });

  const onSuccess = response => {
    const expectedRank = response?.data?.count;
    const title = `현재 예약대기자는 ${expectedRank}명입니다.
예약하시겠습니까?`;
    const message = `주의: 예약도서는 2권 이상 대출할 수 없거나, 연체회원일 경우 대출이 제한됩니다.`;
    setDialogConfig({
      ...dialogDefaultConfig,
      firstButton: {
        ...dialogDefaultConfig.firstButton,
        onClick: postReservation,
      },
      title,
      titleEmphasis: `${expectedRank}명`,
      message,
    });
    openDialog();
  };

  const onError = error => {
    setErrorDialog(error, setOpenTitleAndMessage);
  };

  const getCountReservation = () => {
    request(onSuccess, onError);
  };
  return { getCountReservation };
};

export default useGetReservationsCount;
