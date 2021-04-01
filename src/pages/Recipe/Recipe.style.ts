import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) =>
  createStyles({
    chip: {
      color: theme.palette.info.main,
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(1),
      padding: theme.spacing(0),
    },
    divider: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    ingredientItem: {
      "& .MuiListItemIcon-root": {
        minWidth: "max-content",
      },
      "& .MuiCheckbox-root": {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
      },
    },
  })
);

export default useStyle;
