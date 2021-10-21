import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../css/MidModal.css";
import axios from "axios";
import CloseButton from "../../img/x_button.svg";

const MidModal = ({ lendingId, handleModal }) => {
  const defaultData = {
    createAt: "",
    dueDate: "",
    user: { id: 0, login: "", penaltyDays: 0 },
    book: { id: 0, callSign: "", info: { id: 0, title: "", image: "x.jpg" } },
  };
  const [data, setData] = useState(defaultData);
  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/lendings/${lendingId}`)
      .then(response => {
        setData(response.data);
      });
  }, []);
  console.log(data);
  return (
    <div className="modal__background">
      <div className="modal__container mid">
        <button
          className="modal__close-button mini"
          type="button"
          onClick={handleModal}
        >
          <img src={CloseButton} alt="close" />
        </button>
        <div className="modal__wrapper mid">
          <div className="mid-modal__cover">
            <img src="" alt="cover" />
          </div>
          <div className="mid-modal__detail">
            <div className="mid-modal__book">도서정보</div>
            <div className="mid-modal__user">유저정보</div>
            <div className="mid-modal__lend">대출정보</div>
            <div className="mid-modal__remark">
              <button
                className="modal__confirm-button font-20 color-ff"
                type="button"
              >
                확인하기
              </button>
              <button
                className="modal__cancel-button font-20 color-ff"
                type="button"
              >
                취소하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MidModal.propTypes = {
  handleModal: PropTypes.func.isRequired,
  lendingId: PropTypes.number.isRequired,
};

export default MidModal;
