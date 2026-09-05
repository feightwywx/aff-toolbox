import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Unstable_Grid2 as Grid,
} from "@mui/material";

import type React from "react";
import { useField } from "formik";
import { useTranslation } from "next-i18next";

const CheckBoxField: React.FC<
  CheckboxProps & { singleLine?: boolean; helperText?: boolean }
> = ({ singleLine, helperText, ...props }) => {
  const [field] = useField(props as { name: any });
  const { t } = useTranslation("tools");

  return (
    <Grid
      xs={12}
      sm={!singleLine ? 6 : undefined}
      md={!singleLine ? 4 : undefined}
    >
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...field} {...props} />}
          label={t(`input.${props.name}`)}
        />
        {helperText && (
          <FormHelperText>{t(`input.${props.name}.helper`)}</FormHelperText>
        )}
      </FormGroup>
    </Grid>
  );
};

export default CheckBoxField;
