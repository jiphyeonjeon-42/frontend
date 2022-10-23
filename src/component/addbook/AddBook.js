import React from "react";
import Banner from "../utils/Banner";
import Tabs from "../utils/Tabs";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import IsbnSearchBarWithBarcodeReader from "./AddBookIsbnSearchBarWithBarcodeReader";
import RegisterBookWithUsersExtraInput from "./AddBookRegisterBookWithUsersExtraInput";
import DisplayBasicBookInfo from "./AddBookDisplayBasicBookInfo";
import Book from "../../img/admin_icon.svg";
import "../../css/AddBook.css";
import IMGERR from "../../img/image_onerror.svg";
import { managementTabList } from "../../data/tablist";
import useGetBooksCreate from "../../api/books/useGetBooksCreate";

const AddBook = () => {
  const defaultBook = {
    isbn: "",
    title: "제목",
    image: "",
    author: "",
    publisher: "",
    pubdate: "",
    koreanDemicalClassification: "",
  };

  const { bookInfo, errorMessage, fetchData, setBookInfo } =
    useGetBooksCreate(defaultBook);

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
          <IsbnSearchBarWithBarcodeReader fetchFunction={fetchData} />
          <p>{errorMessage}</p>
          <div className="add-book__basic-info">
            <div className="add-book__basic-info__cover">
              <img
                src={bookInfo.image}
                alt={bookInfo.title}
                onError={subtituteImg}
              />
            </div>
            <div className="add-book__basic-info__detail">
              <DisplayBasicBookInfo
                bookInfo={bookInfo}
                setBookInfo={setBookInfo}
              />
            </div>
          </div>
          <RegisterBookWithUsersExtraInput bookInfo={bookInfo} />
        </div>
      </section>
    </main>
  );
};

export default AddBook;