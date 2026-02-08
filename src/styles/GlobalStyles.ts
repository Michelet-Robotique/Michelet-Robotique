'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: #000000;
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #ffffff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    touch-action: manipulation;
    
    /* Hide scrollbar */
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  #__next, main {
    width: 100%;
    min-height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    background: none;
    border: none;
    color: inherit;
  }

  ::selection {
    background: rgba(0, 200, 255, 0.3);
    color: #ffffff;
  }
`;

export default GlobalStyles;
