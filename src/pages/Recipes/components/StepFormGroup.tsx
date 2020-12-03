import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import { useFieldArray, UseFormMethods } from "react-hook-form";

interface Props
  extends Pick<UseFormMethods, "control" | "errors" | "register"> {
  ingredients: string[];
  stepIngredient: string[][];
}

const StepFormGroup: React.FC<Props> = ({
  control,
  errors,
  register,
  ingredients,
  stepIngredient,
}) => {
  const { append, remove, fields } = useFieldArray<RecipeStep>({
    control,
    keyName: "id",
    name: "steps",
  });

  const removeStep = (index: number) => () => remove(index);
  const addStep = () => append({ description: "" });

  return (
    <>
      {fields.map((_item, index) => (
        <React.Fragment key={index}>
          <Grid item sm={12} className="d-flex align-items-center">
            <Typography variant="h6">Step: {index + 1}</Typography>
            <IconButton aria-label="delete" onClick={removeStep(index)}>
              <DeleteIcon color="error" fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item sm={8}>
            <TextField
              id={`steps[${index}].description`}
              name={`steps[${index}].description`}
              label="Description"
              inputRef={register({ required: "Description required" })}
              error={Boolean(errors.steps && errors.steps[index]?.description)}
              helperText={
                errors.steps && errors.steps[index]?.description?.message
              }
              fullWidth
            />
          </Grid>
          <Grid item sm={4}>
            <Autocomplete
              multiple
              filterSelectedOptions
              onChange={(_event, value) => {
                stepIngredient[index] = value;
              }}
              id="tags-filled"
              options={ingredients}
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip
                    key={index}
                    size="small"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} label="Ingredients" />
              )}
            />
          </Grid>
        </React.Fragment>
      ))}
      <Grid item container alignItems="center" justify="center" sm={12}>
        <Button color="primary" variant="contained" onClick={addStep}>
          Add New Step
        </Button>
      </Grid>
    </>
  );
};

export default StepFormGroup;
