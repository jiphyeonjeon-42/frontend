/* eslint-disable react/prop-types */
import React from "react";
import { useSetRecoilState } from "recoil";
import { isModalOpen } from "./Modal";
import "../css/InquireBoxRent.css";

const InquireBoxRent = ({ modalNum }) => {
  const setUserModal = useSetRecoilState(isModalOpen);

  const openModal = () => {
    setUserModal(modalNum);
  };

  return (
    <div className="inquire-box-rent">
      <button
        className="inquire-box-rent__button color-a4"
        type="button"
        onClick={openModal}
      >
        +
      </button>
    </div>
  );
};

export default InquireBoxRent;
