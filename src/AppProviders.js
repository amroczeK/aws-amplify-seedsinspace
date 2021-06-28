import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";
import { DataProvider } from "./context/Data";
import { AWSProvider } from "./context/AWSContext";

// https://stackoverflow.com/questions/61220424/material-ui-drawer-finddomnode-is-deprecated-in-strictmode
// See answer 2 for reasoning, fixes findDOMNode was passed an instance of Transition which is inside StrictMode
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#6BBE93",
      dark: "#358C5F",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#616161",
      light: "#9E9E9E",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#616161",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },

  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": ["Montserrat"],
      },
    },
  },
});

const StyleProviders = ({ children }) => (
  <MuiThemeProvider theme={muiTheme}>
    <ThemeProvider theme={muiTheme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        {children}
      </StylesProvider>
    </ThemeProvider>
  </MuiThemeProvider>
);

const ContextProviders = ({ children }) => (
  <AWSProvider>
    <DataProvider>{children}</DataProvider>
  </AWSProvider>
);

const AppProviders = ({ children }) => (
  <BrowserRouter>
    <StyleProviders>
      <ContextProviders>{children}</ContextProviders>
    </StyleProviders>
  </BrowserRouter>
);

export default AppProviders;
