import { MouseEventHandler, TouchEventHandler, useState } from "react";
import Image from "../utils/Image";
import { Book } from "../../type";
import { useNavigate } from "react-router-dom";

type Props = {
  docs: Book[];
  centerTop: number;
  onLeft: () => void;
  onRight: () => void;
};

const MainPopularCenter = ({ docs, centerTop, onLeft, onRight }: Props) => {
  const [selected, setSelected] = useState(0);
  const [posX, setPosX] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const navigate = useNavigate();

  const linkToDetail: MouseEventHandler = e => {
    if (posX) return;
    navigate(`/info/${e.currentTarget.id}`);
  };

  const changeSelected: MouseEventHandler<HTMLButtonElement> = e => {
    if (posX) return;
    setSelected(parseInt(e.currentTarget.value, 10));
  };

  const touchStart: TouchEventHandler = e => {
    setPosX(e.touches[0].pageX);
  };
  const touchMove: TouchEventHandler = e => {
    const move = posX - e.touches[0].pageX;
    if (centerTop || move > 0) setMoveX(move);
  };

  const touchEnd: TouchEventHandler = e => {
    if (moveX > 30) onRight();
    else if (moveX < -30) onLeft();
    setMoveX(0);
  };

  const mouseMove: MouseEventHandler = e => {
    if (!posX) return;
    const move = posX - e.clientX;
    if (centerTop || move > 0) setMoveX(move);
  };

  const mouseStart: MouseEventHandler = e => {
    setPosX(e.clientX);
  };

  const mouseEnd: MouseEventHandler = e => {
    if (!posX) return;
    const move = posX - e.clientX;
    if (centerTop || move < 0) setMoveX(move);
    if (move > 30) onRight();
    else if (move < -30) onLeft();
    setMoveX(0);
    setPosX(0);
  };

  const totalBooks = [docs.slice(0, 3), docs.slice(3, 6), docs.slice(6, 9)];

  return (
    <div className="main__popular__content">
      <div
        role="presentation"
        className="main__popular__center"
        onMouseDown={mouseStart}
        onMouseMove={mouseMove}
        onMouseUp={mouseEnd}
        onMouseLeave={mouseEnd}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
        style={{ transform: `translate(${(-750 - moveX) * 0.1}rem)` }}
      >
        {totalBooks.map(books => (
          <div className="main__popular__books">
            {books.map((book, index) => (
              <button
                className={`${
                  selected === index && "selected"
                } main__popular__basic-book center`}
                value={index}
                type="button"
                onClick={selected === index ? linkToDetail : changeSelected}
                key={book.id}
                id={`${book.id}` ?? ""}
              >
                <Image
                  draggable={false}
                  src={book.image}
                  alt={book.title}
                  className={`${
                    selected === index && "selected"
                  } main__popular__basic-img`}
                  value={index}
                />
                <div className="main__popular__summary">
                  <span className="main__popular__rank font-48-bold">
                    {index + 1}
                  </span>
                  <p className="font-16-light color-2d"> #{book.category}</p>
                  <p className="font-32-bold color-2d">{book.title}</p>
                </div>
                <div
                  className={`${
                    selected !== index && "hidden"
                  } main__popular__detail font-16-light color-2d`}
                >
                  <p>작가 | {book.author}</p>
                  <p>출판사 | {book.publisher}</p>
                  {book.publishedAt && (
                    <p>발행일자 | {book.publishedAt.slice(0, 10)}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPopularCenter;
