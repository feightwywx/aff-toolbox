import {
  Card,
  CardContent,
  Unstable_Grid2 as Grid,
  Typography,
} from "@mui/material";
import React, { PropsWithChildren } from "react";
import { Trans } from "next-i18next";

export const CardWithGrid: React.FC<PropsWithChildren<{ title?: string }>> = ({
  children,
  title,
}) => {
  return (
    <>
      <Card>
        {title && (
          <CardContent sx={{ pb: 0 }}>
            <Typography variant="subtitle2">
              <Trans>{title}</Trans>
            </Typography>
          </CardContent>
        )}

        <CardContent>
          <Grid container spacing={2}>
            {children}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
