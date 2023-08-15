import { Trans, useTranslation } from "next-i18next";

import React, { PropsWithChildren } from "react";
import {
  FormControl,
  FormHelperText,
  Unstable_Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useField } from "formik";

interface SelectWithHelperProps extends SelectProps {
  helperText?: boolean;
}

export const AffTextField: React.FC<TextFieldProps> = ({ ...props }) => {
  const [field, meta] = useField(props as { name: any });
  const { t } = useTranslation("tools");

  let isError = Boolean(meta.touched && meta.error);

  return (
    <Grid xs={12}>
      <TextField
        multiline
        fullWidth
        rows={10}
        label={t(`input.${props.name}`)}
        helperText={isError ? t(meta.error!) : t("支持完整AFF或谱面片段")}
        error={isError}
        placeholder={`AudioOffset:248\n-\ntiming(0,222.22,4.00);\n...`}
        {...field}
        {...props}
      />
    </Grid>
  );
};

export const NumberField: React.FC<TextFieldProps> = ({ ...props }) => {
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
      />
    </Grid>
  );
};

export const BezierField: React.FC<TextFieldProps> = ({ ...props }) => {
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
      />
    </Grid>
  );
};

export const ArcField: React.FC<TextFieldProps> = ({ ...props }) => {
  const [field, meta] = useField(props as { name: any });
  const { t } = useTranslation("tools");

  let isError = Boolean(meta.touched && meta.error);

  return (
    <Grid xs={12}>
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

export const CreaseModeSelect: React.FC<SelectWithHelperProps> = ({ ...props }) => {
  const [field, meta] = useField(props as { name: any });
  const { t } = useTranslation("tools");

  let isError = Boolean(meta.touched && meta.error);

  return (
    <Grid xs={12} sm={6} md={4}>
      <FormControl fullWidth>
        <InputLabel>{t("input.creaseMode")}</InputLabel>
        {/* @ts-ignore */}
        <Select
          fullWidth
          label={t("input.creaseMode")}
          error={isError}
          {...field}
          {...props}
        >
          <MenuItem value="m"><Trans t={t}>中线模式</Trans></MenuItem>
          <MenuItem value="b"><Trans t={t}>边线模式</Trans></MenuItem>
        </Select>
        <FormHelperText>
          {isError
            ? t(meta.error!)
            : props.helperText
            ? t(`input.creaseMode.helper`)
            : undefined}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
};

export const ArcEasingModeSelect: React.FC<SelectWithHelperProps> = ({ ...props }) => {
  const [field, meta] = useField(props as { name: any });
  const { t } = useTranslation("tools");

  let isError = Boolean(meta.touched && meta.error);

  return (
    <Grid xs={12} sm={6} md={4}>
      <FormControl fullWidth>
        <InputLabel>{t(`input.${props.name}`)}</InputLabel>
        {/* @ts-ignore */}
        <Select
          fullWidth
          label={t(`input.${props.name}`)}
          error={isError}
          {...field}
          {...props}
        >
          <MenuItem value="s">s</MenuItem>
          <MenuItem value="b">b</MenuItem>
          <MenuItem value="si">si</MenuItem>
          <MenuItem value="so">so</MenuItem>
          <MenuItem value="sisi">sisi</MenuItem>
          <MenuItem value="siso">siso</MenuItem>
          <MenuItem value="sosi">sosi</MenuItem>
          <MenuItem value="soso">soso</MenuItem>
        </Select>
        <FormHelperText>
          {isError
            ? t(meta.error!)
            : props.helperText
            ? t(`input.${props.name}.helper`)
            : undefined}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
};

export const EasingModeSelect: React.FC<SelectWithHelperProps> = ({ ...props }) => {
  const [field, meta] = useField(props as { name: any });
  const { t } = useTranslation("tools");

  let isError = Boolean(meta.touched && meta.error);

  return (
    <Grid xs={12} sm={6} md={4}>
      <FormControl fullWidth>
        <InputLabel>{t(`input.${props.name}`)}</InputLabel>
        {/* @ts-ignore */}
        <Select
          fullWidth
          label={t(`input.${props.name}`)}
          error={isError}
          {...field}
          {...props}
        >
          <MenuItem value="s">s</MenuItem>
          <MenuItem value="b">b</MenuItem>
          <MenuItem value="si">si</MenuItem>
          <MenuItem value="so">so</MenuItem>
        </Select>
        <FormHelperText>
          {isError
            ? t(meta.error!)
            : props.helperText
            ? t(`input.${props.name}.helper`)
            : undefined}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
};

export const SingleLineField: React.FC<PropsWithChildren> = ({
  children,
  ...props
}) => {
  return <Grid xs={12}>{children}</Grid>;
};
