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

type IsDevBook = "" | "dev" | "non-dev";

const categoryOptions = {
  "": [],
  "dev": category.filter(item => item.isDev),
  "non-dev": category.filter(item => !item.isDev),
};

const CategoryOptions = ({ options }: { options: { id: string; name: string }[] }) => (
  <>
    {options.map((element) => (
      <option value={element.id} key={element.id}>
        {element.name}
      </option>
    ))}
  </>
);

const RegisterBookWithUsersExtraInput = ({ bookInfo }: Props) => {
  const [isDevBook, setIsDevBook] = useState<IsDevBook>(() => "");
  const [categoryId, setCategoryId] = useState(() => "");
  const [donator, setDonator] = useState(() => "");
  
  const isReadyToPost = bookInfo.title && bookInfo.author && categoryId && donator;

  const { message, registerBook } = usePostBooksCreate();
  
  const handleSelectIsDevBook: ChangeEventHandler<HTMLSelectElement> = e =>
    setIsDevBook(prev => prev === e.target.value ? prev : e.target.value as IsDevBook);

  const handleSelectCategoryId: ChangeEventHandler<HTMLSelectElement> = e =>
    setCategoryId(prev => prev === e.target.value ? prev : e.target.value);

  const handleChangeDonator = (e: React.ChangeEvent<HTMLInputElement>) => setDonator(e.target.value);

  <CategoryOptions options={categoryOptions[isDevBook] || []} />

  const onSubmit: FormEventHandler = e => {
    e.preventDefault();
    if (isReadyToPost) {
      registerBook({
        ...bookInfo,
        categoryId: +categoryId,
        donator
      });
    } else {
      alert("모든 정보를 입력해주세요");
    }
  };

  useEffect(() => {
    setCategoryId(() => ""); // categoryId 초기화
  }, [isDevBook]);

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
          onChange={handleSelectIsDevBook}
        >
          <option value="">대분류를 선택해주세요</option>
          <option value="dev">개발</option>
          <option value="non-dev">비개발</option>
        </select>
        <select
          required
          className="add-book__category-select"
          name="category"
          id="category-select"
          value={categoryId}
          onChange={handleSelectCategoryId}
        >
          <option value="">카테고리를 선택하세요</option>
          <CategoryOptions options={categoryOptions[isDevBook] ?? []} />
        </select>
      </div>
      <p className="color-red">기부자 정보</p>
      <input
        required
        type="text"
        id="donator"
        name="donator"
        value={donator}
        onChange={handleChangeDonator}
        placeholder="기부자 이름을 입력해주세요"
      />
      <p className="add-book__create-form__errror-Message">{message}</p>
      <button type="submit" className={isReadyToPost ? "red" : ""}>
        등록하기
      </button>
    </form>
  );
};

export default RegisterBookWithUsersExtraInput;
