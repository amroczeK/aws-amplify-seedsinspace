import React from "react";
import { ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";
import { UserProvider } from "./components/context/User";
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

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

const theme = {
  palette: {
    primary: {
      main: "#6BBE93",
      dark: "#358C5F",
    },
    secondary: {
      main: "#616161",
    },
  },
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
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <UserProvider>{children}</UserProvider>
        </StylesProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default Providers;
