import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import AddStepGroup from "../AddStepGroup";

interface Props {
  recipe: Recipe;
  onUpdate: (data: Partial<RecipeForm>) => void;
  handleClose: () => void;
}

const EditStepGroup: React.FC<Props> = ({
  recipe,
  onUpdate,
  handleClose,
  ...rest
}) => {
  const { register, errors, control, handleSubmit } = useForm<
    Partial<RecipeForm>
  >({
    defaultValues: {
      steps: recipe.steps,
    },
  });

  // Handle ingredients autosuggestion for each step
  const stepIngredient = useRef<string[][]>(
    recipe.steps.map((step) => step.ingredients)
  );

  const onSubmit = (data: Partial<RecipeForm>) => {
    data.steps = data.steps?.map((step, index) => ({
      ...step,
      ingredients: stepIngredient.current[index],
    }));
    onUpdate(data);
    handleClose();
  };

  return (
    <Grid
      container
      alignItems="flex-start"
      noValidate
      component="form"
      spacing={3}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item sm={12} container alignItems="flex-end" spacing={3}>
        <Grid item container sm={6} justify="center">
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Grid>
        <Grid item container sm={6} justify="center">
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </Grid>
      </Grid>
      <AddStepGroup
        control={control}
        errors={errors}
        register={register}
        ingredients={recipe.ingredients.map((val) => val.ingredient)}
        stepIngredient={stepIngredient.current}
        {...rest}
      />
    </Grid>
  );
};

export default EditStepGroup;
