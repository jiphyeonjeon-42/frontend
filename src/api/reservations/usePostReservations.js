import useApi from "../../hook/useApi";

const usePostReservations = ({
  bookInfoId,
  dialogDefaultConfig,
  setDialogConfig,
  openDialog,
}) => {
  const { request } = useApi("post", "reservations", {
    bookInfoId,
  });

  const onSuccess = response => {
    const rank = response?.data?.count;
    const lendabledate = response?.data?.lenderableDate?.slice(0, 10);
    const title = `예약 ${rank}순위로 등록되셨습니다.`;
    const message =
      rank === 1 && lendabledate
        ? `대출 가능 예상일자는 ${lendabledate}.입니다.`
        : "대출이 가능해지면 Slack 알림을 보내드리겠습니다.";
    setDialogConfig({
      ...dialogDefaultConfig,
      title,
      titleEmphasis: `${rank}순위`,
      message,
    });
    openDialog();
  };
  const postReservation = () => {
    request(onSuccess);
  };
  return { postReservation };
};

export default usePostReservations;
