import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import AuthTemplate from "../../../components/templates/auth.template";
import { signIn } from "../auth.actions";

const Login = () => {
  const history = useHistory();
  const { handleSubmit, register } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    signIn(data.email, data.password, () => history.push("/"));
  };

  const toRegister = () => history.push("/register");
  const toForgotPassword = () => history.push("/forgot-password");

  return (
    <AuthTemplate
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
      subTitle="Login to your Cooking Blog account"
    >
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
