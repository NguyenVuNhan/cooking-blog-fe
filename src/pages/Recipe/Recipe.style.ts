import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) =>
  createStyles({
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
