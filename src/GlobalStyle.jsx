import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        font-family: "Helvetica", "Arial", sans-serif;
        line-height: 2.0;
      justify-content: center;
      display : flex;
      align-items:center;
      background-color:#EEF5FF;
      min-height: 100%;
    }
`;

export default GlobalStyle;
