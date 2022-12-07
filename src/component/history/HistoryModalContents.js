import React from "react";
import PropTypes from "prop-types";
import TextWithLabel from "../utils/TextWithLabel";
import BookInformationWithCover from "../utils/BookInformationWithCover";
import "../../css/HistoryModalContents.css";

const historyModalContents = ({ historyInfo }) => {
  console.log(historyInfo);
  return (
    <BookInformationWithCover
      wrapperClassName="history-modal__wrapper"
      bookCoverAlt={historyInfo.title}
      bookCoverImg={historyInfo.image}
    >
      <TextWithLabel
        wrapperClassName="history-modal__book"
        topLabelText="도서정보"
        mainText={historyInfo.title}
        bottomLabelText={`청구기호 : ${historyInfo?.callSign} 대출자 : ${historyInfo?.login}`}
      />
      <TextWithLabel
        wrapperClassName="history-modal__lend"
        topLabelText="대출일시"
        mainText={`${historyInfo?.createdAt}`}
      />
      <TextWithLabel
        wrapperClassName="history-modal__return"
        topLabelText="반납일시"
        mainText={
          historyInfo.returnedAt ? `${historyInfo.returnedAt}` : "미반납"
        }
      />
      <TextWithLabel
        wrapperClassName="history-modal__lend"
        topLabelText="대출사서"
        mainText={`${historyInfo?.lendingLibrarianNickName}`}
      />
      <TextWithLabel
        wrapperClassName="history-modal__return"
        topLabelText="반납사서"
        mainText={
          historyInfo.returnedAt
            ? `${historyInfo?.returningLibrarianNickname}`
            : "미반납"
        }
      />
      <TextWithLabel
        wrapperClassName="history-modal__lend"
        topLabelText="대출당시상태"
        mainText={`${historyInfo?.lendingCondition}`}
      />
      <TextWithLabel
        wrapperClassName="history-modal__return"
        topLabelText="반납당시상태"
        mainText={
          historyInfo.returnedAt
            ? `${historyInfo?.returningCondition}`
            : "미반납"
        }
      />
    </BookInformationWithCover>
  );
};

historyModalContents.propTypes = {
  historyInfo: PropTypes.shape.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default historyModalContents;
