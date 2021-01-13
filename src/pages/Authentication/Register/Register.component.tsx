import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ErrorBadge from "components/molecules/ErrorBadge";
import { toLogin } from "helpers/router";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import AuthTemplate from "../../../components/templates/auth.template";
import * as types from "./Register.types";

interface Props {
  onRegister(data: RegisterForm): void;
}

const Register: FC<Props> = ({ onRegister }) => {
  const { handleSubmit, register, errors, watch } = useForm<RegisterForm>();

  return (
    <AuthTemplate
      onSubmit={handleSubmit(onRegister)}
      title="Register"
      subTitle="Create new Cooking Blog account"
    >
      <Grid item sm={12}>
        <ErrorBadge type={types.REGISTER} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          inputRef={register}
          name="name"
          label="User Name"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          inputRef={register}
          name="email"
          label="Email Address"
          type="email"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          inputRef={register({
            required: "You must specify a password",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
          })}
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          error={Boolean(errors.password)}
          helperText={errors.password && errors.password.message}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          inputRef={register({
            validate: (value) =>
              value === watch("password") || "The passwords do not match",
          })}
          name="cpassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          error={Boolean(errors.cpassword)}
          helperText={errors.cpassword && errors.cpassword.message}
        />
      </Grid>
      <Grid
        className="p-2"
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Button color="primary" onClick={toLogin}>
          Login
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </AuthTemplate>
  );
};

export default Register;
