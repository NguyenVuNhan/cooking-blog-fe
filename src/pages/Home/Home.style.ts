import { makeStyles } from "@material-ui/core/styles";

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

export default useStyles;
