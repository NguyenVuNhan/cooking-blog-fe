import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Recipe, RecipeStep } from "../../../@types/recipe";
import { app } from "../../../firebase/firebase";
import { addRecipe } from "../recipes.actions";

const AddRecipe = () => {
  const { register, control, handleSubmit } = useForm<Recipe>({
    defaultValues: {
      ingredients: [],
      steps: [],
    },
  });
  const { append, remove, fields } = useFieldArray<RecipeStep>({
    control,
    keyName: "id",
    name: "steps",
  });
  const ingredients = useRef<String[]>([]);

  const onSubmit = (data: Recipe) => {
    const owner = app.auth().currentUser?.uid;
    const duration: number = data.steps.reduce((acc, curr) => {
      return Number(acc) + Number(curr.duration);
    }, 0);
    addRecipe({
      ...data,
      ingredients: ingredients.current,
      duration,
      owner,
    });
  };

  const removeStep = (index: number) => () => remove(index);
  const addStep = () => append({ duration: 0, description: "" });

  return (
    <Container
      className="p-3"
      maxWidth="md"
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2" align="center" noWrap>
            Add New Recipe
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField name="title" inputRef={register} label="Title" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            inputRef={register}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            onChange={(_event, value) => {
              ingredients.current = value;
            }}
            id="tags-filled"
            options={[]}
            freeSolo
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip size="small" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Ingredients" />
            )}
          />
        </Grid>

        {fields.map((item, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} className="d-flex align-items-center">
              <Typography variant="h6">Step: {index + 1}</Typography>
              <IconButton aria-label="delete" onClick={removeStep(index)}>
                <DeleteIcon color="error" fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id={`steps[${index}].description`}
                name={`steps[${index}].description`}
                label="Description"
                inputRef={register}
                defaultValue={item.description}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id={`steps[${index}].duration`}
                name={`steps[${index}].duration`}
                label="Duration"
                inputRef={register}
                defaultValue={item.duration}
                fullWidth
              />
            </Grid>
          </React.Fragment>
        ))}

        <Grid item container alignItems="center" justify="center" xs={12}>
          <IconButton color="primary" onClick={addStep}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item container xs={12}>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddRecipe;
