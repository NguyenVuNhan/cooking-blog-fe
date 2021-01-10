import React, { FC } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "providers/Theme";
import GlobalStyles from "providers/GlobalStyle";
import Route from "routes";
/* import Test from "./pages/Test/Test"; */

const App: FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Route />
      {/* <Test /> */}
    </MuiThemeProvider>
  );
};

export default App;
