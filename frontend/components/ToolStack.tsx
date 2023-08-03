import { Stack, StackProps } from "@mui/material";
import React from "react";

export const ToolStack: React.FC<StackProps> = ({ children, ...props }) => {
  return (
    <Stack spacing={2} sx={{ mb: 2 }} {...props}>
      {children}
    </Stack>
  );
};
