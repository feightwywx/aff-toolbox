import { useTranslation } from "next-i18next";

import type React from "react";
import {
  Unstable_Grid2 as Grid,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useField } from "formik";

const BezierField: React.FC<TextFieldProps> = ({ ...props }) => {
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
        helperText={
          isError
            ? t(meta.error!)
            : props.helperText
            ? t(`input.${props.name}.helper`)
            : undefined
        }
        error={isError}
        inputProps={{
          "aria-label": `input.${props.name}`,
        }}
      />
    </Grid>
  );
};

export default BezierField;
