import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import type {} from "@material-ui/lab/themeAugmentation";

export const breakPoints = {
  xl: 1920,
  lg: 1280,
  md: 960,
  sm: 600,
  xs: 0,
};

const theme = createMuiTheme({
  breakpoints: {
    values: breakPoints,
  },
});

export default responsiveFontSizes(theme);
