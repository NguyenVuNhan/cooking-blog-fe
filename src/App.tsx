import React from "react";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";
import GlobalStyles from "./globalStyle";
import MainRoute from "./routes";
/* import Test from "./pages/Test/Test"; */

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <MainRoute />
      {/* <Test /> */}
    </MuiThemeProvider>
  );
}

export default App;
