import { createGlobalStyle } from "styled-components";
import styled from 'styled-components';

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

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;


export default GlobalStyle;
