import type { BaseSelectProps, SelectItem } from "@/components/input/interfaces";
import {
  FormControl,
  FormHelperText,
  Unstable_Grid2 as Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import { Trans, useTranslation } from "next-i18next";

import type React from "react";
import { useField } from "formik";

export const BaseSelect: React.FC<BaseSelectProps> = ({
  item,
  helperText,
  overrideSelectLabel,
  ...props
}) => {
  const [field, meta] = useField(props as { name: any });
  const realLabel = overrideSelectLabel ?? `input.${props.name}`;
  const { t } = useTranslation("tools");

  let isError = Boolean(meta.touched && meta.error);

  function constructMenuItem(
    item: SelectItem,
    index: number
  ): React.JSX.Element {
    if (item.isSubHeader) {
      return (
        <ListSubheader key={index}>
          <Trans t={t}>{item.label}</Trans>
        </ListSubheader>
      );
    } else {
      return (
        <MenuItem key={index} value={item.value}>
          <Trans t={t}>{item.label}</Trans>
        </MenuItem>
      );
    }
  }

  return (
    <Grid xs={12} sm={6} md={4}>
      <FormControl fullWidth>
        <InputLabel>{t(realLabel)}</InputLabel>
        <Select
          fullWidth
          label={t(realLabel)}
          error={isError}
          inputProps={{
            role: "listbox",
            // for test purpose
            "aria-label": realLabel,
            "data-testid": realLabel,
          }}
          {...field}
          {...props}
        >
          {item.map(constructMenuItem)}
        </Select>
        <FormHelperText>
          {isError
            ? t(meta.error!)
            : helperText
            ? t(`${realLabel}.helper`)
            : undefined}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
};

export default BaseSelect;
