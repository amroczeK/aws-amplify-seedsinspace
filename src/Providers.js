import React from "react";

import GlobalStyle from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";
import { theme } from "./theme";

// Context
import { UserProvider } from "./components/context/User";

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
