import React from "react";
import { Link } from "react-router-dom";
import "../../css/Box42CopyCat.css";

const Box42CopyCat = ({ setView }) => {
  return (
    <div className="box42__wrapper">
      <Link to="/" className="box42__logo">
        <img
          src="https://raw.githubusercontent.com/42Box/macOS/main/Box42/Resource/Assets.xcassets/42box_logo.imageset/42box_logo.png"
          alt="42box"
        />
      </Link>
      <div className="box42__links">
        <button onClick={() => setView("JIP")}>Jiphyeonjeon</button>
        <button onClick={() => setView("ELIBRARY")}>E-Library</button>
        <button onClick={() => setView("BOX")}>Box 42</button>
        <button onClick={() => setView("HANE24")}>24Hane</button>
        <button onClick={() => setView("CODE80000")}>80000Coding</button>
        <button onClick={() => setView("WHERE42")}>where42</button>
        <button onClick={() => setView("CABI")}>cabi</button>
        <button onClick={() => setView("GG42")}>42gg</button>
      </div>

      <div className="box42__footer">
        <button
          onClick={() => {
            window.alert("웹에서는 구현할 수 없는 Box 기능입니다.");
          }}
        >
          Pin Box
        </button>
        <button
          onClick={() => {
            window.alert("웹에서는 구현할 수 없는 Box 기능입니다.");
          }}
        >
          Quit Box
        </button>
      </div>
    </div>
  );
};

export default Box42CopyCat;
