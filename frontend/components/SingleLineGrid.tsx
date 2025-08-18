import { PropsWithChildren } from "react";
import type React from "react";
import { Unstable_Grid2 as Grid } from "@mui/material";

export const SingleLineGrid: React.FC<PropsWithChildren> = ({ children }) => {
  return <Grid xs={12}>{children}</Grid>;
};

export default SingleLineGrid;
