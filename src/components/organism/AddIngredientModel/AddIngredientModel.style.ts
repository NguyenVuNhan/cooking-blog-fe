import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  title: {
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
    "& button": {
      paddingTop: "0 !important",
      paddingBottom: "0 !important",
    },
  },
});

export default useStyle;
