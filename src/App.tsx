import React from "react";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";
import GlobalStyles from "./globalStyle";
import Route from "./routes";
/* import Test from "./pages/Test/Test"; */

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Route />
      {/* <Test /> */}
    </MuiThemeProvider>
  );
}

export default App;
