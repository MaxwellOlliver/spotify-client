import { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: none;
    border: 0;
    box-sizing: border-box;
  }
  
  html, body, input, button {
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    color: #fff;
    font-size: 14px;
  }
`;