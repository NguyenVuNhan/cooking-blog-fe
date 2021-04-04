import {
  createMuiTheme,
  MuiThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import type {} from "@material-ui/lab/themeAugmentation";
import React, { FC } from "react";

const theme = responsiveFontSizes(
  createMuiTheme({
    overrides: {
      MuiSpeedDialAction: {
        staticTooltipLabel: {
          whiteSpace: "nowrap",
        },
      },
    },
  })
);

const ThemeProvider: FC = ({ children }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
