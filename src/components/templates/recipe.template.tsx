import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Container from "@material-ui/core/Container";
import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import ToolBox from "components/organism/ToolBox";
import Loading from "pages/Loading";
import Box from "@material-ui/core/Box";

interface Props {
  showToolBox?: boolean;
  loading?: boolean;
  hideGoBack?: boolean;
}

const RecipeTemplate: FC<Props> = ({
  children,
  loading = false,
  showToolBox = true,
  hideGoBack = false,
}) => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <Container className="relative" maxWidth="md">
      <Box overflow="auto" className="vh-100 noScrollBar">
        {!hideGoBack && (
          <IconButton onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
        )}
        {loading ? <Loading /> : children}
      </Box>
      {showToolBox && <ToolBox />}
    </Container>
  );
};

export default RecipeTemplate;
