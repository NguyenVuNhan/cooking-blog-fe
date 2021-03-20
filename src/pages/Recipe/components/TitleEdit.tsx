import React, { FC } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";

interface Props {
  onUpdate: (data: Partial<RecipeForm>) => void;
  handleClose?: () => void;
  data: Pick<RecipeForm, "title" | "duration">;
}

const TitleEdit: FC<Props> = ({ onUpdate, handleClose, data }) => {
  const { register, errors, handleSubmit } = useForm<
    Pick<RecipeForm, "title" | "duration">
  >({
    defaultValues: data,
  });

  const onSubmit = (data: Partial<RecipeForm>) => {
    onUpdate(data);
    handleClose && handleClose();
  };

  return (
    <Grid
      container
      noValidate
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={3}
    >
      <Grid item sm={9}>
        <TextField
          name="title"
          inputRef={register({ required: "Title is required" })}
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
          label="Title"
          fullWidth
        />
      </Grid>
      <Grid item sm={3}>
        <TextField
          name="duration"
          label="Duration"
          inputRef={register({ required: "Duration is required" })}
          error={Boolean(errors.duration)}
          helperText={errors.duration?.message}
          fullWidth
        />
      </Grid>

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
    </Grid>
  );
};

export default TitleEdit;
