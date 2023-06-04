import { Trans, useTranslation } from "next-i18next";

import React from "react";
import { Unstable_Grid2 as Grid, TextField } from "@mui/material";
import { useField } from "formik";

export const AffTextField = ({ ...props }) => {
  const [field, meta] = useField(props as { name: any });
  const { t } = useTranslation("tools");

  let isError = Boolean(meta.touched && meta.error);

  return (
    <Grid xs={12}>
      <TextField
        {...field}
        {...props}
        multiline
        fullWidth
        rows={10}
        label={t(`input.${props.name}`)}
        helperText={isError ? t(meta.error!) : t("支持完整AFF或谱面片段")}
        error={isError}
        placeholder={`AudioOffset:248\n-\ntiming(0,222.22,4.00);\n...`}
      />
    </Grid>
  );
};

export const NumberField = ({ ...props }) => {
  const [field, meta] = useField(props as { name: any });
  const { t } = useTranslation("tools");

  let isError = Boolean(meta.touched && meta.error);

  return (
    <Grid xs={12} sm={6} md={4}>
      <TextField
        {...field}
        {...props}
        fullWidth
        label={t(`input.${props.name}`)}
        helperText={isError ? t(meta.error!) : null}
        error={isError}
        type="number"
      />
    </Grid>
  );
};
