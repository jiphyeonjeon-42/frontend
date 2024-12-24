import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  bookInfoId: number;
};

export const usePostReservations = ({ bookInfoId }: Props) => {
  const { request } = useApi("post", "reservations", {
    bookInfoId,
  });

  const { addDialogWithTitleAndMessage } = useNewDialog();
  const onSuccess = (response: any) => {
    const rank = response?.data?.count;
    const lendabledate = response?.data?.lenderableDate?.slice(0, 10);
    const title = `예약 ${rank}순위로 등록되셨습니다.`;
    const message =
      rank === 1 && lendabledate
        ? `대출 가능 예상일자는 ${lendabledate}.입니다.`
        : "대출이 가능해지면 Slack 알림을 보내드리겠습니다.";
    addDialogWithTitleAndMessage("key-reservation-success", title, message);
  };

  const postReservation = () => {
    request(onSuccess);
  };
  return { postReservation };
};
