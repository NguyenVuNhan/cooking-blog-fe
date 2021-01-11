import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import React, {
  Dispatch,
  Fragment,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { useFieldArray, UseFormMethods, useWatch } from "react-hook-form";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import ModalTemplate from "components/templates/modal.template";

interface Props extends Pick<UseFormMethods, "control" | "register"> {
  setIngredients: Dispatch<SetStateAction<string[]>>;
}

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

const AddIngredientGroup: FunctionComponent<Props> = ({
  control,
  setIngredients,
  register,
}) => {
  const classes = useStyle();
  const [open, setOpen] = useState(true);
  const { append, remove, fields } = useFieldArray<Ingredient>({
    control,
    keyName: "id",
    name: "ingredients",
  });
  const ingredientsWatcher = useWatch<Ingredients>({
    control,
    name: "ingredients",
  });

  const deleteIngredient = (index: number) => () => remove(index);
  const addIngredient = () => append({ ingredient: "", quantity: "" });
  const onClose = () => {
    setOpen(false);
    if (ingredientsWatcher) {
      remove();
      setIngredients(
        ingredientsWatcher.map((ingredient) => {
          append(ingredient);
          return ingredient.ingredient;
        })
      );
    }
  };

  return (
    <>
      <IconButton color="primary" onClick={() => setOpen(true)}>
        <AddCircleOutlineIcon />
      </IconButton>

      <ModalTemplate title="Add Ingredient" open={open} onClose={onClose}>
        <Grid
          item
          container
          sm={12}
          alignItems="center"
          className={classes.title}
        >
          <Typography>Ingredients</Typography>
          <IconButton color="primary" onClick={addIngredient}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Grid>
        {fields.map((ingredient, index) => (
          <Fragment key={ingredient.id}>
            <Grid item sm={12} container alignItems="flex-end" spacing={3}>
              <Grid item sm={7}>
                <TextField
                  label="ingredients"
                  name={`ingredients[${index}].ingredient`}
                  inputRef={register}
                  defaultValue={ingredient.ingredient}
                  fullWidth
                  margin="none"
                  size="small"
                ></TextField>
              </Grid>
              <Grid item sm={4}>
                <TextField
                  label="quantity"
                  name={`ingredients[${index}].quantity`}
                  inputRef={register}
                  defaultValue={ingredient.quantity}
                  fullWidth
                  margin="none"
                  size="small"
                ></TextField>
              </Grid>
              <Grid item sm={1}>
                <IconButton onClick={deleteIngredient(index)} className="p-0">
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
            </Grid>
          </Fragment>
        ))}
      </ModalTemplate>
    </>
  );
};

export default AddIngredientGroup;
