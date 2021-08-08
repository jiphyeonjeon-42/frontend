import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import SearchHome from "./component/SearchHome";
import SearchDetail from "./component/SearchDetail";
import "./App.css";
import Header from "./component/Header";
import Banner from "./component/Banner";
// import Books from "./component/Books";
import SearchBar from "./component/SearchBar";

function App() {
  return (
    <RecoilRoot>
      <HashRouter>
        <Route path="/" component={Header} />
        <Route path="/" component={Banner} />
        <Route path="/" component={SearchBar} />
        <Route path="/" exact component={SearchHome} />
        <Route path="/info/:id" component={SearchDetail} />
      </HashRouter>
    </RecoilRoot>
  );
}

export default App;
