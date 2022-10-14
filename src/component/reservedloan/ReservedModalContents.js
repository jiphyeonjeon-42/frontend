import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import useDialog from "../../hook/useDialog";
import BookInformationWithCover from "../utils/BookInformationWithCover";
import TextWithLabel from "../utils/TextWithLabel";
import TextareaWithLabel from "../utils/TextareaWithLabel";
import Button from "../utils/Button";
import dateFormat from "../../util/date";
import getErrorMessage from "../../data/error";
import "../../css/ReservedModalContents.css";

const ReservedModalContents = ({ reservedInfo, closeModal }) => {
  const [remark, setRemark] = useState("");

  const {
    setOpen: openDialog,
    setClose: closeDialog,
    config: dialogConfig,
    setConfig: setDialogConfig,
    Dialog,
  } = useDialog();

  const setDialogTitleAndMessageAfterPost = (title, message) => {
    setDialogConfig({
      ...dialogConfig,
      title,
      message,
      afterClose: () => {
        closeModal();
        window.location.reload();
      },
      firstButton: {
        ...dialogConfig.firstButton,
        onClick: () => {
          closeDialog();
          closeModal();
          window.location.reload();
        },
      },
    });
  };

  const handleRemark = e => {
    e.preventDefault();
    setRemark(e.target.value);
  };

  const postRent = async () => {
    if (!remark) return;
    const condition = remark;
    setRemark("");
    await axios
      .post(`${process.env.REACT_APP_API}/lendings`, {
        userId: reservedInfo.userId,
        bookId: reservedInfo.bookId,
        condition,
      })
      .then(() => {
        setDialogTitleAndMessageAfterPost(
          "대출이 완료되었습니다.",
          reservedInfo.title,
        );
        openDialog();
      })
      .catch(error => {
        if (!error.response) return;
        const errorCode = parseInt(error?.response?.data?.errorCode, 10);
        const [title, message] = getErrorMessage(errorCode).split("\r\n");
        setDialogTitleAndMessageAfterPost(title, message);
        openDialog();
      });
  };

  const deleteReservation = async () => {
    await axios
      .patch(
        `${process.env.REACT_APP_API}/reservations/cancel/${reservedInfo.reservationsId}`,
      )
      .then(() => {
        setDialogTitleAndMessageAfterPost("예약 취소가 완료되었습니다.", "");
      })
      .catch(error => {
        if (!error.response) return;
        const errorCode = parseInt(error?.response?.data?.errorCode, 10);
        const [title, message] = getErrorMessage(errorCode).split("\r\n");
        setDialogTitleAndMessageAfterPost(title, message);
      });
  };

  const confirmDeleteReservation = () => {
    setDialogConfig({
      ...dialogConfig,
      title: "예약을 취소하시겠습니까?",
      message: "주의 : 예약취소는 대기순위를 잃고 되돌릴 수 없습니다.",
      firstButton: {
        ...dialogConfig.firstButton,
        onClick: deleteReservation,
      },
    });
    openDialog();
  };

  const isRentable = !reservedInfo.status && reservedInfo?.endAt;
  const isAvaliableReservation = !reservedInfo.status && !reservedInfo?.endAt;

  return (
    <BookInformationWithCover
      wrapperClassName="reserved-modal__wrapper"
      bookCoverAlt={reservedInfo.title}
      bookCoverImg={reservedInfo.image}
    >
      <Dialog />
      <TextWithLabel
        wrapperClassName="reserved-modal__book"
        topLabelText="도서정보"
        mainText={reservedInfo.title}
        bottomLabelText={
          reservedInfo.callSign && `도서코드 : ${reservedInfo.callSign}`
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
      {isRentable && (
        <>
          <TextareaWithLabel
            wrapperClassName="reserved-modal__remark"
            topLabelText="비고"
            textareaValue={remark}
            onChangeTextarea={handleRemark}
            textareaPlaceHolder="비고를 입력해주세요. (책 상태 등)"
          />
          <div className="reserved-modal__button">
            <Button
              color={remark && "red"}
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
            onClick={confirmDeleteReservation}
          />
        </div>
      )}
    </BookInformationWithCover>
  );
};

ReservedModalContents.propTypes = {
  reservedInfo: PropTypes.shape.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ReservedModalContents;
