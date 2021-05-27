import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";
import { UserProvider } from "./components/context/User";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    background: ${({ theme }) => theme.primaryLight};
    font-family: 'Montserrat', sans-serif;
}
`;

const theme = {
  primaryBackground: "#358C5F",
  primaryDark: "#17252A",
  primaryLight: "#FCFCFC",
  primaryHover: "#CBCBCB",
  secondaryDark: "#2B7A78",
  secondaryLight: "#6BBE93",
  mobile: "576px",
};

const Providers = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <GlobalStyle />
        <UserProvider>{children}</UserProvider>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default Providers;
