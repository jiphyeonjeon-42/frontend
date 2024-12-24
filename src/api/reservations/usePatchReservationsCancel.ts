import { useState, useEffect } from "react";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";

export const usePatchReservationsCancel = () => {
  const [reservationId, setReservationId] = useState<number>();

  const { request } = useApi("patch", `reservations/cancel/${reservationId}`);
  const { addConfirmDialog, addDialogWithTitleAndMessage } = useNewDialog();
  const onSuccess = () => {
    addDialogWithTitleAndMessage(
      "key-reservation-cancel",
      "예약 취소가 완료되었습니다.",
      "",
      () => window.location.reload(),
    );
  };

  const confirmCancelReservation = () => {
    addConfirmDialog(
      `${reservationId} 예약취소`,
      "예약을 취소하시겠습니까?",
      "주의 : 예약취소는 대기순위를 잃고 되돌릴 수 없습니다.",
      () => {
        request(onSuccess);
      },
    );
  };

  useEffect(() => {
    if (reservationId) confirmCancelReservation();
  }, [reservationId]);

  return { setReservationId };
};
