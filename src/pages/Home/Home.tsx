import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import ToolBox from "../../components/organism/Toolbox";

const useStyles = makeStyles({
  container: {
    width: "100vw",
    height: "100vh",
    alignItems: "center",
    "& .MuiPaper-root": {
      padding: 16,
      width: 500,
    },
  },
});

const Home: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm<SearchForm>();

  const onSubmit = ({ data }: SearchForm) => {
    history.push(`/recipe/search?q=${data}`);
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography align="center" variant="h1">
            Cooking Blog
          </Typography>
          <InputBase
            placeholder="Search recipe"
            inputProps={{ "aria-label": "Search recipe" }}
            name="data"
            className="rounded pl-2 w-100 bg-white mt-2 border"
            inputRef={register}
            endAdornment={
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            }
          />
        </form>
      </Box>
    </Container>
  );
};

export default Home;
