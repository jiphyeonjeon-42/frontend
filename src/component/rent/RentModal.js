/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../css/RentModal.css";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import CloseButton from "../../img/x_button.svg";
import MiniModal from "../utils/MiniModal";
import globalModal from "../../atom/globalModal";

const RentModal = ({ selectUser, selectBooks, handleModal }) => {
  const [mini, setMini] = useState("");
  const [remark1, setRemark1] = useState("");
  const [remark2, setRemark2] = useState("");
  const setGlobalError = useSetRecoilState(globalModal);

  const handleRemark1 = e => {
    e.preventDefault();
    setRemark1(e.target.value);
  };

  const handleRemark2 = e => {
    e.preventDefault();
    setRemark2(e.target.value);
  };

  const postData = async () => {
    const data =
      selectBooks.length === 1
        ? [
            {
              userId: selectUser.id,
              bookId: selectBooks[0].id,
              condition: remark1,
            },
          ]
        : [
            {
              userId: selectUser.id,
              bookId: selectBooks[0].id,
              condition: remark1,
            },
            {
              userId: selectUser.id,
              bookId: selectBooks[1].id,
              condition: remark2,
            },
          ];
    setRemark1("");
    setRemark2("");
    await axios
      .post(`${process.env.REACT_APP_API}/lendings`, data)
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
    <>
      {mini ? (
        <MiniModal
          typeProps={mini}
          message={selectBooks[0].info.title}
          handleModal={() => {
            setMini("");
            handleModal();
          }}
        />
      ) : (
        <div className="modal__background">
          <div className="rent-modal__container mid">
            <button
              className="modal__close-button mini"
              type="button"
              onClick={handleModal}
            >
              <img src={CloseButton} alt="close" />
            </button>
            <div className="modal__wrapper mid">
              <div className="rent-modal__user">
                <p className="font-16 color-red">유저정보</p>
                <span className="rent-modal__user__id font-28-bold color-54 margin-8">
                  Name{selectUser.id}
                </span>
                <span className="font-16 color-54">{`현재 대출권수 ( ${
                  selectUser.id % 3
                } / 2 )`}</span>
              </div>
              <div className="rent-modal__books">
                <div className="rent-modal__book-info">
                  <div className="rent-modal__cover">
                    <img
                      src={selectBooks[0].info.image}
                      alt="cover"
                      className="rent-modal__cover-img"
                    />
                  </div>
                  <div className="rent-modal__detail">
                    <div className="mid-modal__book">
                      <p className="font-16 color-red">도서정보</p>
                      <p className="font-28-bold color-54  margin-8">
                        {selectBooks[0].info.title}
                      </p>
                      <p className="font-16 color-54">{`도서코드 : ${selectBooks[0].callSign}`}</p>
                    </div>
                    <div className="rent-modal__remark">
                      <p className="font-16 color-red">비고</p>
                      <textarea
                        className="mid-modal__remark__input margin-8"
                        placeholder="비고를 입력해주세요. (반납 시 책 상태 등)"
                        value={remark1}
                        onChange={handleRemark1}
                      />
                    </div>
                  </div>
                </div>
                {selectBooks.length === 2 && (
                  <div className="rent-modal__book-info second-book">
                    <div className="rent-modal__cover">
                      <img
                        src={selectBooks[1].info.image}
                        alt="cover"
                        className="rent-modal__cover-img"
                      />
                    </div>
                    <div className="rent-modal__detail">
                      <div className="mid-modal__book">
                        <p className="font-16 color-red">도서정보</p>
                        <p className="font-28-bold color-54  margin-8">
                          {selectBooks[1].info.title}
                        </p>
                        <p className="font-16 color-54">{`도서코드 : ${selectBooks[1].callSign}`}</p>
                      </div>
                      <div className="rent-modal__remark">
                        <p className="font-16 color-red">비고</p>
                        <textarea
                          className="mid-modal__remark__input"
                          placeholder="비고를 입력해주세요. (반납 시 책 상태 등)"
                          value={remark2}
                          onChange={handleRemark2}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="rent-modal__button">
                <button
                  className={`modal__button mid font-20 color-ff ${
                    ((selectBooks.length === 2 && remark1 && remark2) ||
                      (selectBooks.length === 1 && remark1)) &&
                    `confirm`
                  }`}
                  type="button"
                  disabled={
                    (selectBooks.length === 2 && remark1 && remark2) ||
                    (selectBooks.length === 1 && remark1)
                      ? ""
                      : "disabled"
                  }
                  onClick={postData}
                >
                  대출 완료하기
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
    </>
  );
};

RentModal.propTypes = {
  handleModal: PropTypes.func.isRequired,
  //   selectUser: PropTypes.object.isRequired,
  //   selectBooks: PropTypes.object.isRequired,
};

export default RentModal;
