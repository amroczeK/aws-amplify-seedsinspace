import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";
import { UserProvider } from "./components/context/User";
import { DataProvider } from "./components/context/Data";
import { S3BucketProvider } from "./components/context/S3Bucket";

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
        <UserProvider>
          <DataProvider>
            <S3BucketProvider>{children}</S3BucketProvider>
          </DataProvider>
        </UserProvider>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default Providers;
