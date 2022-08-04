import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { category, koreanDemicalClassification } from "../../data/category";

const RegisterBookWithUsersExtraInput = ({ bookBasicInfo }) => {
  const [isDevBook, setIsDevBook] = useState("");
  const [categoryId, setCategoryId] = useState("0");
  const [message, setMessage] = useState("");
  const donator = useRef(null);

  const registerBook = async () => {
    setMessage("");
    const newBook = {
      title: bookBasicInfo.title,
      isbn: bookBasicInfo.isbn,
      author: bookBasicInfo.author,
      publisher: bookBasicInfo.publisher,
      image: bookBasicInfo.image,
      pubdate: bookBasicInfo.pubdate,
      categoryId,
      donator: donator.current.value,
    };
    await axios
      .post(`${process.env.REACT_APP_API}/books/create`, newBook)
      .then(() => {
        setMessage("등록되었습니다!");
        window.location.reload();
      })
      .catch(error => {
        const { status, data } = error.response;
        setMessage(
          `실패했습니다 status : ${status} 에러코드 : ${data.errorCode}`,
        );
      });
  };

  const onChangeCategory = e => {
    setCategoryId(parseInt(e.currentTarget.value, 10));
  };

  const onSubmit = e => {
    e.preventDefault();
    setMessage("");
    registerBook();
  };

  const isReadyToPost = () => {
    return categoryId;
  };

  const setDev = () => {
    if (isDevBook && bookBasicInfo?.koreanDemicalClassification)
      setCategoryId(
        koreanDemicalClassification.find(
          i => i.id === bookBasicInfo.koreanDemicalClassification,
        ).categoryId,
      );
    setIsDevBook(!isDevBook);
  };

  return (
    <form className="add-book__create-form" onSubmit={onSubmit}>
      <p className="color-red">신규 도서 카테고리 정보</p>
      <div className="add-book__select">
        <select
          required
          className="add-book__isDev-select"
          name="isDevCategory"
          id="isDevCategory"
          value={isDevBook}
          onChange={setDev}
        >
          <option value="">대분류를 선택해주세요</option>
          <option value>개발</option>
          <option value={false}>비개발</option>
        </select>
        <select
          required
          className="add-book__category-select"
          name="category"
          id="category-select"
          value={categoryId}
          onChange={onChangeCategory}
        >
          <option value="">카테고리를 선택하세요</option>
          {category
            .filter(items => items.isDev === isDevBook)
            .map(element => {
              return (
                <option value={element.id} key={element.id}>
                  {element.name}
                </option>
              );
            })}
        </select>
      </div>
      <p className="add-book__create-form__errror-Message">{message}</p>
      <p className="color-red">기부자 정보</p>
      <input type="text" id="donator" ref={donator} />
      <button type="submit" className={isReadyToPost() && "red"}>
        등록하기
      </button>
    </form>
  );
};

export default RegisterBookWithUsersExtraInput;

RegisterBookWithUsersExtraInput.propTypes = {
  bookBasicInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    isbn: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    pubdate: PropTypes.string.isRequired,
    koreanDemicalClassification: PropTypes.string.isRequired,
  }).isRequired,
};
