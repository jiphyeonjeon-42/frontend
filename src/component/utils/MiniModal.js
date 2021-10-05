import React from "react";
import { useSetRecoilState } from "recoil";
import PropTypes from "prop-types";
import globalModal from "../../atom/globalModal";
import "../../css/MiniModal.css";
import CloseButton from "../../img/x_button.svg";

const MiniModal = ({ handleModal, type }) => {
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
        message: `오류 확인 및 수정을 위해 slack 으로 문의 부탁드립니다!. 오류코드 : ${global.error}`,
      };
      onConfirm = handleModal;
      onCancel = handleModal;
      break;
    case "confirm":
      text = {
        title: "현재 예약대기자는 ",
        emphasis: fetchOrder(),
        title_after: "입니다. 예약하시겠습니까?",
        message:
          "주의: 예약도서는 2권 이상 대출할 수 없거나, 연체회원일 경우 대출이 제한됩니다.",
      };
      onCancel = handleModal;
      break;
    default:
      text = {
        title: "예기치 못한 오류가 발생했습니다",
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
          <h1>{text.title}</h1>
          <h2>{text.message}</h2>
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
  );
};

MiniModal.propTypes = {
  handleModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default MiniModal;
