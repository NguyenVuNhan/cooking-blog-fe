import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";
import ModalTemplate from "components/templates/modal.template";
import React, { FC, Fragment } from "react";
import { useFieldArray, UseFormMethods, useWatch } from "react-hook-form";
import useStyle from "./AddIngredientModel.style";

interface Props extends Pick<UseFormMethods, "control" | "register"> {
  open: boolean;
  handleClose: () => void;
  handleSave?: (ingredients: Ingredients) => void;
}

const AddIngredientModel: FC<Props> = ({
  control,
  handleClose,
  handleSave,
  register,
  open,
}) => {
  const classes = useStyle();
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

  const _handleSave = () => {
    handleClose();
    if (ingredientsWatcher) {
      remove();
      ingredientsWatcher.forEach((val) => append(val));
    }
    handleSave && handleSave(ingredientsWatcher || []);
  };

  return (
    <ModalTemplate title="Add Ingredient" open={open} onClose={handleClose}>
      <Grid
        item
        container
        sm={12}
        alignItems="center"
        className={clsx(classes.title, "mb-2")}
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
      <Grid item sm={12} container alignItems="flex-end" spacing={3}>
        <Grid item container sm={6} justify="center">
          <Button
            className={classes.actionBtn}
            variant="contained"
            color="primary"
            onClick={_handleSave}
          >
            Save
          </Button>
        </Grid>
        <Grid item container sm={6} justify="center">
          <Button
            className={classes.actionBtn}
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </ModalTemplate>
  );
};

export default AddIngredientModel;
