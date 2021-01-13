import Alert from "@material-ui/lab/Alert";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { ErrorAction, ErrorState } from "reducers/errorReducer";
import { IRootState } from "reducers/rootReducer";

interface Props {
  type: keyof ErrorState;
}

const ErrorBadge: FC<Props> = ({ type }) => {
  const error = useSelector<IRootState, ErrorAction["error"] | undefined>(
    (state) => state.error[type]
  );

  return (
    <>
      {error &&
        error.errors.map((e, index) => (
          <Alert
            key={index}
            severity="error"
            className="mb-1"
            style={{ width: "100%" }}
          >
            {e.msg}
          </Alert>
        ))}
    </>
  );
};

export default ErrorBadge;
