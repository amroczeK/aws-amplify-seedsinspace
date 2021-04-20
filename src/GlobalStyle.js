import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none !important;
}
body {
    background: ${({ theme }) => theme.secondaryLight};
    font-family: 'Montserrat', sans-serif;
}
`;

export default GlobalStyle;
