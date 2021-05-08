import React from "react";

import GlobalStyle from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";
import { theme } from "./theme";

const Providers = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <GlobalStyle />
        {children}
      </StylesProvider>
    </ThemeProvider>
  );
};

export default Providers;
