import {
  useRef,
  useState,
  useEffect,
  ChangeEventHandler,
  FormEventHandler,
} from "react";
import {
  category,
  koreanDemicalClassification as 중앙도서관도서분류,
} from "~/constant/category";
import { usePostBooksCreate } from "~/api/books/usePostBooksCreate";
import { BookInfo } from "~/type";

type Props = {
  bookInfo: Omit<BookInfo, "id">;
};

const RegisterBookWithUsersExtraInput = ({ bookInfo }: Props) => {
  const [isDevBook, setIsDevBook] = useState<"" | "true" | "false">("");
  const [categoryId, setCategoryId] = useState("");
  const donator = useRef<HTMLInputElement>(null);
  const isReadyToPost = categoryId && bookInfo.title && bookInfo.author;

  useEffect(() => {
    setIsDevBook("");
    setCategoryId("");
  }, [bookInfo]);

  const { message, registerBook } = usePostBooksCreate();

  const onSubmit: FormEventHandler = e => {
    e.preventDefault();
    registerBook({
      ...bookInfo,
      categoryId: +categoryId,
      donator: donator.current?.value || "",
    });
  };

  const setDev: ChangeEventHandler<HTMLSelectElement> = e => {
    const { value } = e.currentTarget;
    if (value === "true") {
      setCategoryId("");
      setIsDevBook(value);
    } else if (value === "false") {
      const id = 중앙도서관도서분류.find(i => i.id === bookInfo.category);
      if (id) setCategoryId(id?.categoryId);
      setIsDevBook("false");
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
          onChange={e => setCategoryId(e.currentTarget.value)}
        >
          <option value="">카테고리를 선택하세요</option>
          {category
            ?.filter(items => `${items.isDev}` === isDevBook)
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
      <button type="submit" className={isReadyToPost && "red"}>
        등록하기
      </button>
    </form>
  );
};

export default RegisterBookWithUsersExtraInput;
