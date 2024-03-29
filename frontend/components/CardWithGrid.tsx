import {
  Card,
  CardContent,
  Unstable_Grid2 as Grid,
  Typography,
  TypographyProps,
} from "@mui/material";
import React, { PropsWithChildren } from "react";
import { Trans, useTranslation } from "next-i18next";

export const CardWithGrid: React.FC<PropsWithChildren<{ title?: string }>> = ({
  children,
  title,
}) => {
  const { t } = useTranslation("tools");
  return (
    <>
      <Card>
        {title && (
          <CardContent sx={{ pb: 0 }}>
            <Typography variant="subtitle2">
              <Trans t={t}>{title}</Trans>
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

export const SubtitleTypography: React.FC<TypographyProps> = ({
  children,
  ...props
}) => {
  const { t } = useTranslation("tools");
  return (
    <Grid xs={12}>
      <Typography variant="subtitle2" {...props}>
        <Trans t={t}>{children}</Trans>
      </Typography>
    </Grid>
  );
};

export const DescriptonTypography: React.FC<TypographyProps> = ({
  children,
  ...props
}) => {
  return (
    <Grid xs={12}>
      <Typography {...props}>
        <Trans>{children}</Trans>
      </Typography>
    </Grid>
  );
};
