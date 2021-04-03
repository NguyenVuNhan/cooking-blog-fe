import { CircularProgress } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React, { FC } from "react";

const Loading: FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
