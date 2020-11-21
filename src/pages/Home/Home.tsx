import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useForm } from "react-hook-form";
import background from "../../assets/landing.jpg";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignItems: "center",
    "& .MuiPaper-root": {
      padding: 16,
      width: 500,
    },
  },
});

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm<SearchForm>();

  const onSubmit = ({ data }: SearchForm) => {
    history.push(`/recipe/search?q=${data}`);
  };

  return (
    <Container className={classes.container} maxWidth={false}>
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
            className="rounded pl-2 w-100 bg-white mt-2"
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
