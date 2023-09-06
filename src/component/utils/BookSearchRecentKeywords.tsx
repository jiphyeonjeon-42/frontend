import { useState } from "react";
import { Link } from "react-router-dom";
import Image from "~/component/utils/Image";
import X_button from "~/asset/img/x_button.svg";
import "~/asset/css/BookSearchRecentKeyword.css";

const BookSearchRecentKeyword = () => {
  const storageSaved = localStorage.getItem("recent") || "[]";
  const [keywords, setKeywords] = useState<string[]>(JSON.parse(storageSaved));

  const removeKeyword = (keyword: string) => {
    const newKeywords = keywords.filter(k => k !== keyword);
    localStorage.setItem("recent", JSON.stringify(newKeywords));
    setKeywords(newKeywords);
  };

  return (
    <div className="recent-keyword__wrapper">
      <h3>최근 검색어</h3>
      <ul className="recent-keyword__list">
        {keywords.map(keyword => (
          <li key={keyword} className="recent-keyword__keyword">
            <Link to={`/search?search=${encodeURIComponent(keyword)}`}>
              <p>{keyword}</p>
            </Link>
            <button
              className="recent-keyword__remove"
              onClick={e => {
                e.stopPropagation();
                removeKeyword(keyword);
              }}
            >
              <Image src={X_button} alt="삭제" />
            </button>
          </li>
        ))}
        {keywords.length === 0 && (
          <li className="recet-keyword__no-record">
            최근 검색된 기록이 없습니다
          </li>
        )}
      </ul>
    </div>
  );
};

export default BookSearchRecentKeyword;
