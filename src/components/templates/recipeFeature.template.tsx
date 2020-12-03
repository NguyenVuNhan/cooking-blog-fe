import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Container from "@material-ui/core/Container";
import React, { FunctionComponent, ReactNode } from "react";
import ToolBox from "../organism/Toolbox";
import { useHistory } from "react-router-dom";

interface Props {
  children: ReactNode;
  showToolBox?: boolean;
}

const RecipeFeatureTemplate: FunctionComponent<Props> = ({
  children,
  showToolBox = true,
}) => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <Container className="position-relative" maxWidth="lg">
      <IconButton onClick={goBack}>
        <ArrowBackIcon />
      </IconButton>
      {showToolBox && <ToolBox />}
      {children}
    </Container>
  );
};

export default RecipeFeatureTemplate;
