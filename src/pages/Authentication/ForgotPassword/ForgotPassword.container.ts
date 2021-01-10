import { connect } from "react-redux";
import { Dispatch } from "redux";
import { forgotPassword } from "./ForgotPassword.actions";
import ForgotPasswordComponent from "./ForgotPassword.component";
import { ForgotPasswordActionType } from "./ForgotPassword.types";

const mapDispatchToProps = (dispatch: Dispatch<ForgotPasswordActionType>) => ({
  onForgotPassword: (data: ForgotPasswordForm) => {
    dispatch(forgotPassword(data));
  },
});

export default connect(null, mapDispatchToProps)(ForgotPasswordComponent);
