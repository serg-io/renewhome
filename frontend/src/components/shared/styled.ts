import {createGlobalStyle, css} from 'styled-components';

/**
 * Global styles accessible to the entire app
 */
export const GlobalStyles = createGlobalStyle`
${({theme}) => css`
  /* Reset and cascade box-sizing. https://css-tricks.com/box-sizing/ */
  html {
    box-sizing: border-box;
    height: 100%;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    background-color: ${theme.color.pageBackground};
    color: ${theme.text.color};
    margin: 0;
    font-family: ${theme.text.fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    height: 100%;
  }

  #root {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  * {
    font-family: ${theme.text.fontFamily};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  a,
  a:hover,
  a:active,
  a:focus {
    color: ${theme.color.primary};
    text-decoration: underline;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }

  button,
  [role='button'] {
    -webkit-tap-highlight-color: transparent; // fix for ON-2900
  }
`}
`;
