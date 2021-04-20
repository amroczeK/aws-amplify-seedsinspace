import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { theme } from "./theme";
import { Base } from "./components";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Base/>
    </ThemeProvider>
  );
};

export default App;
