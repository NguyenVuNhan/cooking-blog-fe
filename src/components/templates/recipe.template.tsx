import Container from "@material-ui/core/Container";
import React, { FunctionComponent } from "react";
import ToolBox from "../organism/Toolbox";

const RecipeTemplate: FunctionComponent = ({ children }) => {
  return (
    <Container className="position-relative" maxWidth="lg">
      <ToolBox />
      {children}
    </Container>
  );
};

export default RecipeTemplate;
