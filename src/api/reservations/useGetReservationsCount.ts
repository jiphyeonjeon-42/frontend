import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  bookInfoId: number;
  postReservation: () => void;
};

export const useGetReservationsCount = ({
  bookInfoId,
  postReservation,
}: Props) => {
  const { request } = useApi("get", "reservations/count", {
    bookInfo: bookInfoId,
  });

  const { addConfirmDialog } = useNewDialog();
  const onSuccess = (response: any) => {
    const expectedRank = response?.data?.count;
    const title = `현재 예약대기자는 ${expectedRank}명입니다.
예약하시겠습니까?`;
    const message = `주의: 예약도서는 2권 이상 대출할 수 없거나, 연체회원일 경우 대출이 제한됩니다.`;

    addConfirmDialog("reservationConfirm", title, message, postReservation);
  };

  const getCountReservation = () => {
    request(onSuccess);
  };
  return { getCountReservation };
};
