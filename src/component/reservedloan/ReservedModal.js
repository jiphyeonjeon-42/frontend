/* eslint-disable react/forbid-prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../css/MidModal.css";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import CloseButton from "../../img/x_button.svg";
import MiniModal from "../utils/MiniModal";
import globalModal from "../../atom/globalModal";

const ReservedModal = ({ reservedInfo, handleModal }) => {
  // const defaultData = {
  //   createdAt: "",
  //   dueDate: "",
  //   user: { id: 0, login: "", penaltyDays: 0 },
  //   book: { id: 0, callSign: "", info: { id: 0, title: "", image: "x.jpg" } },
  // };
  // const [data, setData] = useState(defaultData);
  const [mini, setMini] = useState("");
  const [remark, setRemark] = useState("");
  const setGlobalError = useSetRecoilState(globalModal);

  const handleRemark = e => {
    e.preventDefault();
    setRemark(e.target.value);
  };
  // useEffect(async () => {
  //   await axios
  //     .get(`${process.env.REACT_APP_API}/lendings/${lendingId}`)
  //     .then(response => {
  //       setData(response.data);
  //     });
  // }, []);
  const postData = async () => {
    if (!remark) return;
    const condition = remark;
    setRemark("");
    await axios
      .post(`${process.env.REACT_APP_API}/lendings`, {
        userId: reservedInfo.user.id,
        bookId: reservedInfo.book.id,
        condition,
      })
      .then(() => {
        setMini("lend");
      })
      .catch(error => {
        setMini("error");
        setGlobalError({
          view: true,
          error: `lendings/ POST ${error.name} ${error.message}`,
        });
      });
  };
  return (
    <div className="modal__background">
      {mini ? (
        <MiniModal
          typeProps={mini}
          message={reservedInfo.book.info.title}
          handleModal={() => {
            setMini("");
            handleModal();
          }}
        />
      ) : (
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
              <img
                src={reservedInfo.book.info.image}
                alt="cover"
                className="mid-modal__cover-img"
              />
            </div>
            <div className="mid-modal__detail">
              <div className="mid-modal__book">
                <p className="font-16 color-red">도서정보</p>
                <p className="font-28-bold color-54  margin-8">
                  {reservedInfo.book.info.title}
                </p>
                <p className="font-16 color-54">{`도서코드 : ${reservedInfo.book.callSign}`}</p>
              </div>
              <div className="mid-modal__user">
                <p className="font-16 color-red">유저정보</p>
                <p className="font-28-bold color-54  margin-8">
                  {reservedInfo.user.login}
                </p>
                <p className="font-16 color-54">{`연체일수 : ${reservedInfo.user.penaltyDays}`}</p>
              </div>
              <div className="mid-modal__lend">
                <p className="font-16 color-red">예약 만료일</p>
                <p className="font-28-bold color-54  margin-8">
                  {reservedInfo.endAt ? reservedInfo.endAt : "NULL"}
                </p>
                {/* <p className="font-16 color-54">{`예약한 날짜 : ${reservedInfo.endAt}`}</p> */}
              </div>
              <div className="mid-modal__remark">
                <p className="font-16 color-red">비고</p>
                <textarea
                  className="mid-modal__remark__input margin-8"
                  placeholder="비고를 입력해주세요. (반납 시 책 상태 등)"
                  value={remark}
                  onChange={handleRemark}
                />
                <button
                  className={`modal__button mid font-20 color-ff ${
                    remark && `confirm`
                  }`}
                  type="button"
                  onClick={postData}
                >
                  예약대출 완료하기
                </button>
                <button
                  className="modal__button mid font-20 color-ff"
                  type="button"
                  onClick={handleModal}
                >
                  취소하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ReservedModal.propTypes = {
  handleModal: PropTypes.func.isRequired,
  reservedInfo: PropTypes.object.isRequired,
};

export default ReservedModal;