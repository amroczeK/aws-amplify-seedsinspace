import { createMuiTheme } from "@material-ui/core/styles";

/**
 * Colour scheme reference:
 * https://visme.co/blog/website-color-schemes/
 * No. 24 - Clean and Modern
 */
export const theme = {
  primaryBackground: "#358C5F",
  primaryDark: "#17252A",
  primaryLight: "#FCFCFC",
  primaryHover: "#CBCBCB",
  secondaryDark: "#2B7A78",
  secondaryLight: "#6BBE93",
  mobile: "576px",
};

export const muitheme = createMuiTheme({
  palette: {
    primary: {
      main: "#358C5F",
    },
    secondary: {
      main: "#2B7A78",
    },
  },
});
