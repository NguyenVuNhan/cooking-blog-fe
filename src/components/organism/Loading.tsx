import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import React, { FC } from "react";
import Backdrop from "@material-ui/core/Backdrop";

interface Props {
  overlay?: boolean;
}

const LoadingWrapper: FC<Props> = ({ overlay, children }) => {
  if (overlay) {
    return (
      <Backdrop open style={{ zIndex: 1000 }}>
        {children}
      </Backdrop>
    );
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      minHeight="inherit"
    >
      {children}
    </Box>
  );
};

const Loading: FC<Props> = ({ overlay }) => {
  return (
    <LoadingWrapper overlay={overlay}>
      <CircularProgress />
    </LoadingWrapper>
  );
};

export default Loading;
