import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { toLogin } from "helpers/router";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import AuthTemplate from "../../../components/templates/auth.template";

interface Props {
  onForgotPassword(data: LoginForm): void;
}

const ForgotPassword: FC<Props> = ({ onForgotPassword }) => {
  const { handleSubmit, register } = useForm<ForgotPasswordForm>();

  return (
    <AuthTemplate
      onSubmit={handleSubmit(onForgotPassword)}
      title="Forgot password?"
      subTitle="We will send an email for you with link to reset password"
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

export default ForgotPassword;
