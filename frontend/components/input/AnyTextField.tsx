import {
  Unstable_Grid2 as Grid,
  TextField,
  TextFieldProps,
} from "@mui/material";

import type React from "react";
import { useField } from "formik";
import { useTranslation } from "next-i18next";

const AnyTextField: React.FC<
  TextFieldProps & { singleLine?: boolean }
> = ({ singleLine, ...props }) => {
  const [field, meta] = useField(props as { name: any });
  const { t } = useTranslation("tools");

  let isError = Boolean(meta.touched && meta.error);

  return (
    <Grid
      xs={12}
      sm={!singleLine ? 6 : undefined}
      md={!singleLine ? 4 : undefined}
    >
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
      />
    </Grid>
  );
};

export default AnyTextField;
