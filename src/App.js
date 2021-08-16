import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Books from "./component/Books";
import SearchDetail from "./component/SearchDetail";
import "./App.css";
import Header from "./component/Header";
import Banner from "./component/Banner";
// import Books from "./component/Books";
import SearchLoader from "./component/SearchLoader";
import Footer from "./component/Footer";
import SearchBar from "./component/SearchBar";

function App() {
  return (
    <RecoilRoot>
      <HashRouter>
        <Route path="/" component={Header} />
        <Route path="/" component={Banner} />
        <Route path="/" component={SearchBar} />
        <Route path="/" exact component={Books} />
        <Route path="/info/:id" component={SearchDetail} />
        <Route path="/" exact component={SearchLoader} />
        <Route path="/" component={Footer} />
      </HashRouter>
    </RecoilRoot>
  );
}

export default App;
