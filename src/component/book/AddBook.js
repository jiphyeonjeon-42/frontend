import React, { useState } from "react";
import Banner from "../utils/Banner";
import Tabs from "../utils/Tabs";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import FetchBasicBookInfoWithIsbn from "./AddBookFetchBasicBookInfoWithIsbn";
import RegisterBookWithUsersExtraInput from "./AddBookRegisterBookWithUsersExtraInput";
import DisplayBasicBookInfo from "./AddBookDisplayBasicBookInfo";
import Book from "../../img/admin_icon.svg";
import "../../css/AddBook.css";
import IMGERR from "../../img/image_onerror.svg";
import { managementTabList } from "../../data/tablist";

const AddBook = () => {
  const [bookInfo, setBookInfo] = useState({
    isConfirmedInfo: true,
    newBookBasicInfo: {
      isbn: "",
      title: "제목",
      image: "",
      author: "",
      publisher: "",
      pubdate: "",
      koreanDemicalClassification: "",
    },
  });

  const setBasicInfo = newBasicInfo => {
    setBookInfo({
      ...bookInfo,
      newBookBasicInfo: newBasicInfo,
    });
  };

  function subtituteImg(e) {
    e.target.src = IMGERR;
  }
  return (
    <main>
      <Banner img="admin" titleKo="도서 신규 등록" titleEn="ADD BOOK" />
      <Tabs tabList={managementTabList} />
      <section className="inquire-box__wrapper">
        <InquireBoxTitle Icon={Book} titleKO="도서 등록" titleEN="Add Book" />
        <div className="inquire-box add-book">
          <p className="color-red">ISBN</p>
          <FetchBasicBookInfoWithIsbn setBookInfo={setBookInfo} />
          <div className="add-book__basic-info">
            <div className="add-book__basic-info__cover">
              <img
                src={bookInfo.newBookBasicInfo.image}
                alt={bookInfo.newBookBasicInfo.title}
                onError={subtituteImg}
              />
            </div>
            <div className="add-book__basic-info__detail">
              <DisplayBasicBookInfo
                bookInfo={bookInfo}
                setBasicInfo={setBasicInfo}
              />
            </div>
          </div>
          <RegisterBookWithUsersExtraInput
            bookBasicInfo={bookInfo.newBookBasicInfo}
          />
        </div>
      </section>
    </main>
  );
};

export default AddBook;
