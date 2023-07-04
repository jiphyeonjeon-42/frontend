import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DURATION: number = 50000;
const ROWS: number = 10;
const TAGS_PER_ROW: number = 10;

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
const shuffle = arr => [...arr].sort(() => 0.5 - Math.random());

const InfiniteLoopSlider = ({ children, duration, reverse = false }) => {
  return (
    <div
      className="loop-slider"
      style={{
        "--duration": `${duration}ms`,
        "--direction": reverse ? "reverse" : "normal",
      }}
    >
      <div className="inner">
        {children}
        {children}
      </div>
    </div>
  );
};

const hashtagSpan = {
  fontSize: "2.7rem",
  color: "rgba(255, 255, 255, 0.7)",
};

const Tag = ({ text, tagClick }) => (
  <div className="main_tag" onClick={() => tagClick(text)}>
    <span style={hashtagSpan}>#</span> {text}
  </div>
);

const MainTagList = ({ tags }: string[]) => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const tagClick = text => {
    setContent(text);
    const encodedURIContent = encodeURIComponent(text);
    try {
      navigate(`/search?search=${encodedURIContent}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="main-tag-list_Background">
      {[...new Array(ROWS)].map((_, i) => (
        <InfiniteLoopSlider
          key={i}
          duration={random(DURATION - 5000, DURATION + 5000)}
          reverse={i % 2}
        >
          {shuffle(tags)
            .slice(0, TAGS_PER_ROW)
            .map(tag => (
              <Tag text={tag} tagClick={tagClick} />
            ))}
        </InfiniteLoopSlider>
      ))}
      <div className="fade" />
    </div>
  );
};

export default MainTagList;
