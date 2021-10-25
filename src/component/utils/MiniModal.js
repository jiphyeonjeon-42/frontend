import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import PropTypes from "prop-types";
import globalModal from "../../atom/globalModal";
import "../../css/MiniModal.css";
import CloseButton from "../../img/x_button.svg";

const MiniModal = ({ handleModal, typeProps, bookId, message }) => {
  const [type, setType] = useState(typeProps);
  const [fetchNumber, setFetchNumber] = useState(-1);
  const [fetchString, setFetchString] = useState("");
  const [globalError, setGlobalError] = useRecoilState(globalModal);
  useEffect(() => {
    return () => {
      window.location.reload();
    };
  }, []);
  const fetchReservOrder = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/books/${bookId}/reservations/count/`)
      .then(response => {
        setFetchNumber(response.data.count);
      })
      .catch(error => {
        setGlobalError({
          view: true,
          error: `books/:id/reservations/count/ ${error.name} ${error.message}`,
        });
        setType("error");
      });
  };

  const postReserv = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}/reservations/`, {
        bookId,
      })
      .then(response => {
        const rank = response.data.count;
        if (rank === 1) {
          console.log(response);
          setType("successWithDate");
          setFetchNumber(rank);
          setFetchString("21.01.01");
        } else {
          setType("successDefault");
          setFetchNumber(rank);
        }
      })
      .catch(error => {
        setGlobalError({
          view: true,
          error: `/reservations/ ${error.name} ${error.message}`,
        });
        setType("error");
      });
  };

  let text;
  let onConfirm;
  let onCancel;
  switch (type) {
    case "error":
      text = {
        title: "예기치 못한 오류가 발생했습니다",
        emphasis: "",
        title_after: "",
        title_next: "",
        message: `오류 확인 및 수정을 위해 slack 으로 문의 부탁드립니다!. 오류코드 : ${globalError.error}`,
      };
      onConfirm = () => {
        handleModal();
        setGlobalError({ view: false, error: "" });
      };
      break;
    case "confirm":
      if (fetchNumber === -1) fetchReservOrder();
      text = {
        title: "현재 예약대기자는 ",
        emphasis: `${fetchNumber}명`,
        title_after: "입니다.",
        title_next: "예약하시겠습니까?",
        message:
          "주의: 예약도서는 2권 이상 대출할 수 없거나, 연체회원일 경우 대출이 제한됩니다.",
      };
      onConfirm = () => {
        setFetchNumber(-1);
        setType("loading");
        postReserv();
      };
      onCancel = handleModal;
      break;
    case "successDefault":
      text = {
        title: "예약 ",
        emphasis: `${fetchNumber}순위`,
        title_after: "로 등록되셨습니다.",
        title_next: "",
        message: "대출이 가능해지면 Slack 알림을 보내드리겠습니다.",
      };
      onConfirm = handleModal;
      break;
    case "successWithDate":
      text = {
        title: "예약 ",
        emphasis: `${fetchNumber}순위`,
        title_after: "로 등록되셨습니다.",
        title_next: "",
        message: `대출 가능 일자는 ${fetchString}입니다. 감사합니다.`,
      };
      onConfirm = handleModal;
      break;
    case "failDefault":
      text = {
        title: "이미 동일한 책을 대출하셨거나",
        emphasis: "",
        title_after: "",
        title_next: "예약하셨습니다.",
        message: "예약이 제한됩니다.",
      };
      onConfirm = handleModal;
      break;
    case "loading":
      text = {
        title: "요청하신 예약을 진행중입니다.",
        emphasis: "",
        title_after: "",
        title_next: "",
        message: "잠시만 기다려주세요.",
      };
      break;
    case "return":
      text = {
        title: "반납이 완료되었습니다.",
        emphasis: "",
        title_after: "",
        title_next: "",
        message,
      };
      onConfirm = handleModal;
      break;
    case "lend":
      text = {
        title: "대출이 완료되었습니다.",
        emphasis: "",
        title_after: "",
        title_next: "",
        message,
      };
      onConfirm = handleModal;
      break;
    default:
      if (globalError.error) {
        setType("error");
      }
      text = {
        title: "예기치 못한 오류가 발생했습니다",
        emphasis: "",
        title_after: "",
        title_next: "",
        message: "잘못된 접근입니다",
      };
      onConfirm = handleModal;
      break;
  }

  return (
    <div className="modal__background">
      <div className="mini modal__container">
        {type !== "loading" && (
          <button
            className="modal__close-button mini"
            type="button"
            onClick={handleModal}
          >
            <img src={CloseButton} alt="close" />
          </button>
        )}
        <div className="modal__wrapper">
          <div className="mini-modal__text">
            <p className="mini-modal__text__title font-32-bold color-2d">
              {text.title}
              <span className="color-red">{text.emphasis}</span>
              {text.title_after}
            </p>
            <p className="font-32-bold color-2d">{text.title_next}</p>
            <p className="mini-modal__text__message font-18-bold color-54">
              {text.message}
            </p>
          </div>
          <div>
            {type !== "loading" && (
              <button
                className="modal__button confirm mini font-20 color-ff"
                type="button"
                onClick={onConfirm}
              >
                확인하기
              </button>
            )}
            {type === "confirm" && (
              <button
                className="modal__button mini font-20 color-ff"
                type="button"
                onClick={onCancel}
              >
                취소하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

MiniModal.defaultProps = {
  bookId: "1",
  message: "",
};

MiniModal.propTypes = {
  handleModal: PropTypes.func.isRequired,
  typeProps: PropTypes.string.isRequired,
  bookId: PropTypes.number,
  message: PropTypes.string,
};

export default MiniModal;
