import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    background-color: #F8F8F8;
  }

  button{
      cursor: pointer
  }
`;

export default GlobalStyle;
