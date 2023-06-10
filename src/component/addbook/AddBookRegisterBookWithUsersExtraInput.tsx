import { useRef, useState, useEffect } from "react";
import { category, koreanDemicalClassification } from "../../data/category";
import usePostBooksCreate from "../../api/books/usePostBooksCreate";

type Props = {
  bookInfo: {
    title: string;
    isbn: string;
    author: string;
    publisher: string;
    image: string;
    pubdate: string;
    koreanDemicalClassification: string;
  };
};

const RegisterBookWithUsersExtraInput = ({
  bookInfo,
}: Props) => {
  const [isDevBook, setIsDevBook] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const donator = useRef(null);

  useEffect(() => {
    setIsDevBook("");
    setCategoryId("");
  }, [bookInfo]);
  const { message, registerBook } = usePostBooksCreate();

  const onChangeCategory = e => {
    setCategoryId(parseInt(e.currentTarget.value, 10));
  };

  const onSubmit = e => {
    e.preventDefault();
    registerBook({
      ...bookInfo,
      categoryId: `${categoryId}`,
      donator: donator.current.value,
    });
  };

  const isReadyToPost = () => {
    return categoryId && bookInfo.title && bookInfo.author;
  };

  const setDev = e => {
    const value = e.currentTarget.value === "true";
    if (!value && bookInfo?.koreanDemicalClassification)
      setCategoryId(
        koreanDemicalClassification.find(
          i => i.id === bookInfo.koreanDemicalClassification,
        ).categoryId,
      );
    setIsDevBook(value);
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
            ?.filter(items => items.isDev === isDevBook)
            ?.map(element => {
              return (
                <option value={element.id} key={element.id}>
                  {element.name}
                </option>
              );
            })}
        </select>
      </div>
      <p className="color-red">기부자 정보</p>
      <input type="text" id="donator" ref={donator} />
      <p className="add-book__create-form__errror-Message">{message}</p>
      <button type="submit" className={isReadyToPost() && "red"}>
        등록하기
      </button>
    </form>
  );
};

export default RegisterBookWithUsersExtraInput;
