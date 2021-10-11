import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import PropTypes from "prop-types";
import globalModal from "../../atom/globalModal";
import "../../css/MiniModal.css";
import CloseButton from "../../img/x_button.svg";

const MiniModal = ({ handleModal, typeProps }) => {
  const [type, setType] = useState(typeProps);
  const setGlobalModal = useSetRecoilState(globalModal);
  const fetchOrder = () => {
    const result = {
      status: "200",
      statusText: "axios로 수정해야 하는데 api가 완성된걸까",
    };
    setGlobalModal({
      view: true,
      error: `api ${result.status} ${result.statusText}`,
    });
    return "n명";
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
        message: `오류 확인 및 수정을 위해 slack 으로 문의 부탁드립니다!. 오류코드 : ${global.error}`,
      };
      onConfirm = handleModal;
      onCancel = handleModal;
      break;
    case "confirm":
      text = {
        title: "현재 예약대기자는 ",
        emphasis: fetchOrder(),
        title_after: "입니다.",
        title_next: "예약하시겠습니까?",
        message:
          "주의: 예약도서는 2권 이상 대출할 수 없거나, 연체회원일 경우 대출이 제한됩니다.",
      };
      onConfirm = () => {
        setType("loading");
        setTimeout(() => {
          const rand = Math.floor(Math.random() * 2);
          if (!rand) {
            setType("successDefault");
          } else if (rand === 1) {
            setType("failDefault");
          }
        }, 5000);
      };
      onCancel = handleModal;
      break;
    case "successDefault":
      text = {
        title: "예약 ",
        emphasis: "nn순위",
        title_after: "로 등록되셨습니다.",
        title_next: "",
        message: "대출이 가능해지면 Slack 알림을 보내드리겠습니다.",
      };
      onConfirm = handleModal;
      break;
    case "successWithDate":
      text = {
        title: "예약 ",
        emphasis: "nn순위",
        title_after: "로 등록되셨습니다.",
        title_next: "",
        message: "대출 가능 일자는 21.00.00.입니다. 감사합니다.",
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
    default:
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
      <div className="mini-modal__container">
        <button
          className="mini-modal__close-button"
          type="button"
          onClick={handleModal}
        >
          <img src={CloseButton} alt="close" />
        </button>
        <div className="mini-modal__wrapper">
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
            <button
              className="mini-modal__confirm-button font-20 color-ff"
              type="button"
              onClick={onConfirm}
            >
              확인하기
            </button>
            {type === "confirm" && (
              <button
                className="mini-modal__cancel-button font-20 color-ff"
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

MiniModal.propTypes = {
  handleModal: PropTypes.func.isRequired,
  typeProps: PropTypes.string.isRequired,
};

export default MiniModal;
