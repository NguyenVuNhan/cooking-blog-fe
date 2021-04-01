import Container from "@material-ui/core/Container";
import React, { FunctionComponent } from "react";
import ToolBox from "../organism/ToolBox";

const RecipeTemplate: FunctionComponent = ({ children }) => {
  return (
    <Container maxWidth="lg">
      {children}
      <ToolBox />
    </Container>
  );
};

export default RecipeTemplate;
