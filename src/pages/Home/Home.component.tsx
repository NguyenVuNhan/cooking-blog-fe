import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Search from "components/molecules/Search";
import React from "react";
import { useHistory } from "react-router-dom";
import ToolBox from "../../components/organism/Toolbox";
import useStyles from "./Home.style";

const Home: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container
      className={clsx(classes.container, "position-relative")}
      maxWidth={false}
    >
      <ToolBox />
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <div>
          <Typography align="center" variant="h1">
            Cooking Blog
          </Typography>
          <Search onSearch={(query) => history.push(`recipe/search${query}`)} />
        </div>
      </Box>
    </Container>
  );
};

export default Home;
