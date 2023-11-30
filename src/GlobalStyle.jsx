import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
/* body 태그 밑으로 모든 태그에 폰트 적용 */
    body {
        font-family: "Helvetica", "Arial", sans-serif;
        line-height: 2.0;
      justify-content: center;
      display : flex;
      align-items:center;
    }
`;

export default GlobalStyle;
