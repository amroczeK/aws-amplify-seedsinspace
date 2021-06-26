import { ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { UserProvider } from "./context/User";
import { DataProvider } from "./context/Data";
import { S3BucketProvider } from "./context/S3Bucket";
import { BrowserRouter } from "react-router-dom";

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
  <S3BucketProvider>
    <UserProvider>
      <DataProvider>{children}</DataProvider>
    </UserProvider>
  </S3BucketProvider>
);

const AppProviders = ({ children }) => (
  <BrowserRouter>
    <StyleProviders>
      <ContextProviders>{children}</ContextProviders>
    </StyleProviders>
  </BrowserRouter>
);

export default AppProviders;
