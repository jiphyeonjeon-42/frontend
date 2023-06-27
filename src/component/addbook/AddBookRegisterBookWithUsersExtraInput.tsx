import {
  useRef,
  useState,
  useEffect,
  ChangeEventHandler,
  FormEventHandler,
} from "react";
import { category, koreanDemicalClassification } from "../../constant/category";
import { usePostBooksCreate } from "../../api/books/usePostBooksCreate";
import { BookInfo } from "../../type";

type Props = {
  bookInfo: BookInfo;
};

const RegisterBookWithUsersExtraInput = ({ bookInfo }: Props) => {
  const [isDevBook, setIsDevBook] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const donator = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsDevBook(false);
    setCategoryId("");
  }, [bookInfo]);

  const { message, registerBook } = usePostBooksCreate();

  const onChangeCategory: ChangeEventHandler<HTMLSelectElement> = e => {
    setCategoryId(e.currentTarget.value);
  };

  const onSubmit: FormEventHandler = e => {
    e.preventDefault();
    registerBook({
      ...bookInfo,
      categoryId: `${categoryId}`,
      donator: donator.current?.value || "",
    });
  };

  const isReadyToPost = () => {
    return categoryId && bookInfo.title && bookInfo.author;
  };

  const setDev: ChangeEventHandler<HTMLSelectElement> = e => {
    const value = e.currentTarget.value === "true";
    if (!value && bookInfo?.koreanDemicalClassification) {
      const id = koreanDemicalClassification.find(
        i => i.id === bookInfo.koreanDemicalClassification,
      )?.categoryId;
      id && setCategoryId(id);
      setIsDevBook(value);
    }
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
          value={`${isDevBook}`}
          onChange={setDev}
        >
          <option value="">대분류를 선택해주세요</option>
          <option value="true">개발</option>
          <option value="false">비개발</option>
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
