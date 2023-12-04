import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 /* @import url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/Cafe24Supermagic-Bold-v1.0.woff2'); */
/* body 태그 밑으로 모든 태그에 폰트 적용 */
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
