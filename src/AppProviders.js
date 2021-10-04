import CssBaseline from "@material-ui/core/CssBaseline";
import { AWSProvider } from "./context/AWSContext";
import { DataProvider } from "./context/Data";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";
import { QueryClient, QueryClientProvider } from "react-query";

// https://stackoverflow.com/questions/61220424/material-ui-drawer-finddomnode-is-deprecated-in-strictmode
// findDOMNode was passed an instance of Transition which is inside StrictMode, causes other crash
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";

const queryClient = new QueryClient();

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
    button: {
      textTransform: "none",
    },
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
  <QueryClientProvider client={queryClient}>
    <AWSProvider>
      <DataProvider>{children}</DataProvider>
    </AWSProvider>
  </QueryClientProvider>
);

const AppProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <StyleProviders>
        <ContextProviders>{children}</ContextProviders>
      </StyleProviders>
    </BrowserRouter>
  );
};
export default AppProviders;
