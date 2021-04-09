import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import IngredientInput from "components/molecules/IngredientInput";
import React, { FC, Fragment } from "react";
import { useFieldArray, UseFormMethods, useWatch } from "react-hook-form";
import useStyle from "./AddIngredientModel.style";

interface Props extends Pick<UseFormMethods, "control" | "register"> {
  open: boolean;
  handleClose: () => void;
  handleSave?: (ingredients: Ingredients) => void;
  title: string;
}

const AddIngredientModel: FC<Props> = ({
  control,
  handleClose,
  handleSave,
  register,
  title,
  open,
}) => {
  const classes = useStyle();
  const { append, remove, fields } = useFieldArray<Ingredient>({
    control,
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
    handleSave && handleSave(ingredientsWatcher || []);
  };

  return (
    <Dialog
      title={title}
      open={open}
      onClose={handleClose}
      keepMounted
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Ingredients</DialogTitle>
      <DialogContent dividers>
        {fields.map((ingredient, index) => (
          <Fragment key={ingredient.id}>
            <Grid item sm={12} container alignItems="flex-end" spacing={3}>
              <Grid item sm={7}>
                <IngredientInput
                  control={control}
                  label="Ingredients"
                  name={`ingredients[${index}].ingredient`}
                  defaultValue={ingredient.ingredient}
                  fullWidth
                  margin="none"
                  size="small"
                />
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
        <Button
          startIcon={<AddCircleOutlineIcon />}
          color="primary"
          onClick={addIngredient}
          className={classes.addBtn}
        >
          Add Ingredient
        </Button>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={_handleSave}>
          Save
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddIngredientModel;
