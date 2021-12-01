import { createGlobalStyle } from 'styled-components';

import { COLORS } from './variables';

export const GlobalStyles = createGlobalStyle`
  html {
    background-color: ${COLORS.PLAIN_9};
  }

  body {
    font-family: -apple-system, Roboto, sans-serif, serif;
    margin: 0;
    padding: 0;
    color: ${COLORS.BRAND_1};
    background-color: ${COLORS.PLAIN_10};
  }

  html, body, #root, .App {
    width: 100%;
    height: 100%;
    background-color: #F6F6F6;
  }

  a:any-link {
    text-decoration: none;
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
