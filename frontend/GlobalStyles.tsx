import { createGlobalStyle, DefaultTheme } from "styled-components"

const GlobalStyle = createGlobalStyle<DefaultTheme>`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 9px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 99px;
    border: 3px solid ${(props) => props.theme.colors.black};
  }

  body {
    font-family: 'Montserrat', sans-serif;
    font-size: ${(props) => props.theme.fontSize};
    font-weight: ${(props) => props.theme.fontWeight.regular};
    background-color: ${(props) => props.theme.colors.backgroundColor};
    color: ${(props) => props.theme.colors.primaryTextColor};
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
  }

  a {
    display: inline-block;
    color: inherit;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  button {
    font: inherit;
    color: inherit;
    background-color: unset;
    padding: 0;
    margin: 0;
    border: unset;
    cursor: pointer;
  }

  input {
    font: inherit;
    background-color: unset;
    padding: 0;
    margin: 0;
    border: none;
  }
`

export default GlobalStyle
