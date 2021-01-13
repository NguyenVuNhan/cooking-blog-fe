import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Search from "components/molecules/Search";
import ToolBox from "components/organism/ToolBox";
import { forwardTo } from "helpers/router";
import React from "react";
import useStyles from "./Home.style";

const Home: React.FC = () => {
  const classes = useStyles();

  const _onSearch = (query: string) => {
    forwardTo(`recipe/search${query}`);
  };

  return (
    <Container className={classes.container} maxWidth={false}>
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
          <Search onSearch={_onSearch} />
        </div>
      </Box>
    </Container>
  );
};

export default Home;
