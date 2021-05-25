import React from "react";

import GlobalStyle from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/core/styles";
import { theme, muitheme } from "./theme";

// Context
import { UserProvider } from "./components/context/User";

const Providers = ({ children }) => {
  return (
    <MuiThemeProvider theme={muitheme}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <GlobalStyle />
          <UserProvider>{children}</UserProvider>
        </StylesProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default Providers;
