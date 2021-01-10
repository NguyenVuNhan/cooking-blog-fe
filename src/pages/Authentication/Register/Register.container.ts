import { connect } from "react-redux";
import { Dispatch } from "redux";
import { register } from "./Register.actions";
import RegisterComponent from "./Register.component";
import { RegisterActionType } from "./Register.types";

const mapDispatchToProps = (dispatch: Dispatch<RegisterActionType>) => ({
  onRegister: (data: RegisterForm) => {
    dispatch(register(data));
  },
});

export default connect(null, mapDispatchToProps)(RegisterComponent);
