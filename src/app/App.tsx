import React, { FC } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import GlobalStyles from "./style";
import Route from "routes";
import ShoppingListProvider from "providers/ShoppingListProvider";
import ThemeProvider from "providers/ThemeProvider";
import Box from "@material-ui/core/Box";

const App: FC = () => {
  return (
    <ThemeProvider>
      <ShoppingListProvider>
        <CssBaseline />
        <GlobalStyles />
        <Box minHeight="100vh" minWidth="100vw">
          <Route />
        </Box>
      </ShoppingListProvider>
    </ThemeProvider>
  );
};

export default App;
