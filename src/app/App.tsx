import React, { FC } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import GlobalStyles from "./style";
import Route from "routes";
import ShoppingListProvider from "providers/ShoppingListProvider";
import ThemeProvider from "providers/ThemeProvider";

const App: FC = () => {
  return (
    <ThemeProvider>
      <ShoppingListProvider>
        <CssBaseline />
        <GlobalStyles />
        <Route />
      </ShoppingListProvider>
    </ThemeProvider>
  );
};

export default App;
