import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Container from "@material-ui/core/Container";
import React, { FunctionComponent, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import ToolBox from "components/organism/ToolBox";

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
    <Container maxWidth="lg">
      {showToolBox && <ToolBox />}
      <IconButton onClick={goBack}>
        <ArrowBackIcon />
      </IconButton>
      {children}
    </Container>
  );
};

export default RecipeFeatureTemplate;
