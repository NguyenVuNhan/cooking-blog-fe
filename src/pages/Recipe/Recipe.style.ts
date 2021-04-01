import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) =>
  createStyles({
    chip: {
      color: theme.palette.info.main,
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(1),
      padding: theme.spacing(0),
    },
  })
);

export default useStyle;
