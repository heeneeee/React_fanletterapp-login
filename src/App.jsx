import React from "react";
import Router from "./shared/Router";
import GlobalStyle from "GlobalStyle";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { __getLetters } from "redux/modules/fanLetters";
// import GlobalStyle from "components/GlobalStyle";

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Router />
    </div>
  );
};

export default App;
