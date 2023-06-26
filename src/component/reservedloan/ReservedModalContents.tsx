import { FormEventHandler, useState } from "react";
import { useDialog } from "../../hook/useDialog";
import { usePostLendings } from "../../api/lendings/usePostLendings";
import { usePatchReservationsCancel } from "../../api/reservations/usePatchReservationsCancel";
import Button from "../utils/Button";
import TextWithLabel from "../utils/TextWithLabel";
import TextareaWithLabel from "../utils/TextareaWithLabel";
import BookInformationWithCover from "../utils/BookInformationWithCover";
import { isValidString } from "../../util/typeCheck";
import { dateFormat } from "../../util/date";
import "../../asset/css/ReservedModalContents.css";
import { Reservation } from "../../type";

type Props = {
  reservedInfo: Reservation;
  closeModal: () => void;
};

const ReservedModalContents = ({ reservedInfo, closeModal }: Props) => {
  const [remark, setRemark] = useState("");

  const { setReservationId: cancelReservation } = usePatchReservationsCancel();

  const { requestLending } = usePostLendings({
    title: reservedInfo?.title,
    userId: reservedInfo?.userId,
    bookId: reservedInfo?.bookId,
    closeModal,
  });

  const postRent: FormEventHandler = e => {
    e.preventDefault();
    requestLending(remark);
  };

  const isRent = !reservedInfo.status && reservedInfo?.endAt;
  const isRentable = isRent && isValidString(remark);
  const isAvaliableReservation = !reservedInfo.status && !reservedInfo?.endAt;

  return (
    <BookInformationWithCover
      wrapperClassName="reserved-modal__wrapper"
      bookCoverAlt={reservedInfo.title}
      bookCoverImg={reservedInfo.image}
    >
      <TextWithLabel
        wrapperClassName="reserved-modal__book"
        topLabelText="도서정보"
        mainText={reservedInfo.title}
        bottomLabelText={
          reservedInfo.callSign && `청구기호 : ${reservedInfo.callSign}`
        }
      />
      <TextWithLabel
        wrapperClassName="reserved-modal__lend"
        topLabelText={reservedInfo?.endAt ? "예약 만료일" : "예약 신청일"}
        mainText={dateFormat(reservedInfo?.endAt || reservedInfo?.createdAt)}
      />
      <TextWithLabel
        wrapperClassName="reserved-modal__user"
        topLabelText="유저정보"
        mainText={reservedInfo?.login || ""}
        bottomLabelText={`연체일수 : ${reservedInfo.penaltyDays}일`}
      />
      {isRent && (
        <>
          <TextareaWithLabel
            wrapperClassName="reserved-modal__remark"
            topLabelText="비고"
            textareaPlaceHolder="비고를 입력해주세요. (책 상태 등)"
            textareaValue={remark}
            setTextareaValue={setRemark}
            isVisibleBottomMessage={!remark.length}
            bottomMessageText="비고를 입력해주세요"
            bottomMessageColor="red"
          />
          <div className="reserved-modal__button">
            <Button
              color={(isRentable && "red") || undefined}
              disabled={!isRentable}
              onClick={postRent}
              value="대출 완료하기"
            />
          </div>
        </>
      )}
      {isAvaliableReservation && (
        <div className="reserved-modal__button cancel">
          <Button
            value="예약 취소"
            color="red"
            onClick={() => cancelReservation(reservedInfo?.reservationsId)}
          />
        </div>
      )}
    </BookInformationWithCover>
  );
};

export default ReservedModalContents;
