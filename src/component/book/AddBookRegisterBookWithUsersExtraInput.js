import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import category from "../../data/category";

const RegisterBookWithUsersExtraInput = ({ bookBasicInfo }) => {
  const [categoryId, setCategoryId] = useState(0);
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
  return (
    <form className="add-book__create-form" onSubmit={onSubmit}>
      <p className="color-red">신규 등록 도서 관리 정보</p>
      <select
        name="category"
        required
        id="category-select"
        value={categoryId}
        onChange={onChangeCategory}
      >
        <option value="">카테고리를 선택하세요</option>
        {category.map(element => {
          return (
            <option value={element.id} key={element.id}>
              {element.name}
            </option>
          );
        })}
      </select>
      <p className="add-book__create-form__errror-Message">{message}</p>

      <p className="color-red">기부자 정보</p>
      <input type="text" id="donator" ref={donator} />

      <button type="submit" className={isReadyToPost && "is-ready"}>
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
  }).isRequired,
};
