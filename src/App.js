import React from "react";
import { RecoilRoot } from "recoil";
import Routes from "./Routes";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <Routes />
    </RecoilRoot>
  );
}

export default App;
