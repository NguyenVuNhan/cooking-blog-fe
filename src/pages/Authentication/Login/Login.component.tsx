import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { forwardTo } from "helpers/router";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import AuthTemplate from "components/templates/auth.template";
import * as types from "./Login.types";
import ErrorBadge from "components/molecules/ErrorBadge";

interface Props {
  onLogin(data: LoginForm): void;
}

const Login: FC<Props> = ({ onLogin }) => {
  const { handleSubmit, register } = useForm<LoginForm>();

  const toRegister = () => forwardTo("/register");
  const toForgotPassword = () => forwardTo("/forgot-password");

  return (
    <AuthTemplate
      onSubmit={handleSubmit(onLogin)}
      title="Login"
      subTitle="Login to your Cooking Blog account"
    >
      <Grid item sm={12}>
        <ErrorBadge type={types.LOGIN} />
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
          inputRef={register}
          name="password"
          label="Password"
          variant="outlined"
          type="password"
        />
        <Button
          className="float-left"
          color="primary"
          onClick={toForgotPassword}
        >
          Forgot password?
        </Button>
      </Grid>
      <Grid
        className="p-2"
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Button color="primary" onClick={toRegister}>
          Create Account
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </AuthTemplate>
  );
};

export default Login;
