import React from "react";
import Router from "./shared/Router";
import GlobalStyle from "GlobalStyle";

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
