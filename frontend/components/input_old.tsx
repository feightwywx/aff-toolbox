import { Trans, useTranslation } from "next-i18next";

import { PropsWithChildren, useState } from "react";
import type React from "react";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormHelperText,
  Unstable_Grid2 as Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  TextFieldProps,
  Unstable_Grid2,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useField } from "formik";
import * as Yup from "yup";
import ToolFormikForm from "./ToolFormikForm";
import { StatusCode } from "@/utils/interfaces";
import { SubtitleTypography } from "./CardWithGrid";
import { ArcFieldProps, SelectWithHelperProps, InputAdornmentButtonProps, CreateArcParams } from "./input/interfaces";

export const ArcField: React.FC<TextFieldProps & ArcFieldProps> = ({
  allowMultiline,
  ...props
}) => {
  const [field, meta, helpers] = useField(props as { name: any });
  const { t } = useTranslation("tools");

  let isError = Boolean(meta.touched && meta.error);

  return (
    <Grid xs={12}>
      <FormControl fullWidth variant="outlined" error={isError}>
        <InputLabel>{t(`input.${props.name}`)}</InputLabel>
        <OutlinedInput
          label={t(`input.${props.name}`)}
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <CreateArcButton
                fieldHelpers={helpers}
                currentValue={field.value}
                appendMode={allowMultiline}
              />
            </InputAdornment>
          }
          inputProps={{
            "aria-label": `input.${props.name}`,
          }}
          {...field}
          {...(allowMultiline
            ? {
                multiline: true,
                minRows: 3,
              }
            : {})}
        />
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

export const CreaseModeSelect: React.FC<SelectWithHelperProps> = ({
  ...props
}) => {
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
          inputProps={{
            role: "listbox",
            "aria-label": `input.${props.name}`,
            "data-testid": `input.${props.name}`,
          }}
          {...field}
          {...props}
        >
          <MenuItem value="m">
            <Trans t={t}>中线模式</Trans>
          </MenuItem>
          <MenuItem value="b">
            <Trans t={t}>边线模式</Trans>
          </MenuItem>
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

export const ArcEasingModeSelect: React.FC<SelectWithHelperProps> = ({
  ...props
}) => {
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
          inputProps={{
            role: "listbox",
            "aria-label": `input.${props.name}`,
            "data-testid": `input.${props.name}`,
          }}
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

export const EasingModeSelect: React.FC<SelectWithHelperProps> = ({
  ...props
}) => {
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
          inputProps={{
            role: "listbox",
            "aria-label": `input.${props.name}`,
            "data-testid": `input.${props.name}`,
          }}
          {...field}
          {...props}
        >
          <ListSubheader>Arcaea</ListSubheader>
          <MenuItem value="s">s</MenuItem>
          <MenuItem value="b">b</MenuItem>
          <MenuItem value="si">si</MenuItem>
          <MenuItem value="so">so</MenuItem>
          <ListSubheader>
            <Trans t={t}>select.extend</Trans>
          </ListSubheader>
          <MenuItem value="ease_in_sine">easeInSine</MenuItem>
          <MenuItem value="ease_out_sine">easeOutSine</MenuItem>
          <MenuItem value="ease_in_out_sine">easeInOutSine</MenuItem>
          <MenuItem value="ease_in_quad">easeInQuad</MenuItem>
          <MenuItem value="ease_out_quad">easeOutQuad</MenuItem>
          <MenuItem value="ease_in_out_quad">easeInOutQuad</MenuItem>
          <MenuItem value="ease_in_cubic">easeInCubic</MenuItem>
          <MenuItem value="ease_out_cubic">easeOutCubic</MenuItem>
          <MenuItem value="ease_in_out_cubic">easeInOutCubic</MenuItem>
          <MenuItem value="ease_in_quart">easeInQuart</MenuItem>
          <MenuItem value="ease_out_quart">easeOutQuart</MenuItem>
          <MenuItem value="ease_in_out_quart">easeInOutQuart</MenuItem>
          <MenuItem value="ease_in_quint">easeInQuint</MenuItem>
          <MenuItem value="ease_out_quint">easeOutQuint</MenuItem>
          <MenuItem value="ease_in_out_quint">easeInOutQuint</MenuItem>
          <MenuItem value="ease_in_expo">easeInExpo</MenuItem>
          <MenuItem value="ease_out_expo">easeOutExpo</MenuItem>
          <MenuItem value="ease_in_out_expo">easeInOutExpo</MenuItem>
          <MenuItem value="ease_in_circ">easeInCirc</MenuItem>
          <MenuItem value="ease_out_circ">easeOutCirc</MenuItem>
          <MenuItem value="ease_in_out_circ">easeInOutCirc</MenuItem>
          <MenuItem value="ease_in_back">easeInBack</MenuItem>
          <MenuItem value="ease_out_back">easeOutBack</MenuItem>
          <MenuItem value="ease_in_out_back">easeInOutBack</MenuItem>
          <MenuItem value="ease_in_elastic">easeInElastic</MenuItem>
          <MenuItem value="ease_out_elastic">easeOutElastic</MenuItem>
          <MenuItem value="ease_in_out_elastic">easeInOutElastic</MenuItem>
          <MenuItem value="ease_in_bounce">easeInBounce</MenuItem>
          <MenuItem value="ease_out_bounce">easeOutBounce</MenuItem>
          <MenuItem value="ease_in_out_bounce">easeInOutBounce</MenuItem>
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

export const ArcColorSelect: React.FC<SelectWithHelperProps> = ({
  ...props
}) => {
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
          <MenuItem value="0">
            <Trans t={t}>select.blue</Trans>
          </MenuItem>
          <MenuItem value="1">
            <Trans t={t}>select.red</Trans>
          </MenuItem>
          <MenuItem value="2">
            <Trans t={t}>select.green</Trans>
          </MenuItem>
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

export const EnvelopeModeSelect: React.FC<SelectWithHelperProps> = ({
  ...props
}) => {
  const [field, meta] = useField(props as { name: any });
  const { t } = useTranslation("tools");

  let isError = Boolean(meta.touched && meta.error);

  return (
    <Grid xs={12} sm={6} md={4}>
      <FormControl fullWidth>
        <InputLabel>{t("input.envelopeMode")}</InputLabel>
        {/* @ts-ignore */}
        <Select
          fullWidth
          label={t("input.envelopeMode")}
          error={isError}
          inputProps={{
            role: "listbox",
            "aria-label": "input.envelopeMode",
            "data-testid": "input.envelopeMode",
          }}
          {...field}
          {...props}
        >
          <MenuItem value="c">
            <Trans t={t}>input.envelopeMode.crease</Trans>
          </MenuItem>
          <MenuItem value="p">
            <Trans t={t}>input.envelopeMode.parallel</Trans>
          </MenuItem>
        </Select>
        <FormHelperText>
          {isError
            ? t(meta.error!)
            : props.helperText
            ? t(`input.envelopeMode.helper`)
            : undefined}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
};

export const RainLimitModeSelect: React.FC<SelectWithHelperProps> = ({
  ...props
}) => {
  const [field, meta] = useField(props as { name: any });
  const { t } = useTranslation("tools");

  let isError = Boolean(meta.touched && meta.error);

  return (
    <Grid xs={12} sm={6} md={4}>
      <FormControl fullWidth>
        <InputLabel>{t("input.rainLimitMode")}</InputLabel>
        {/* @ts-ignore */}
        <Select
          fullWidth
          label={t("input.rainLimitMode")}
          error={isError}
          inputProps={{
            role: "listbox",
            "aria-label": "input.rainLimitMode",
            "data-testid": "input.rainLimitMode",
          }}
          {...field}
          {...props}
        >
          <MenuItem value="s">
            <Trans t={t}>input.rainLimitMode.standard</Trans>
          </MenuItem>
          <MenuItem value="e">
            <Trans t={t}>input.rainLimitMode.enwiden</Trans>
          </MenuItem>
          <MenuItem value="eb">
            <Trans t={t}>input.rainLimitMode.enwidenbyd</Trans>
          </MenuItem>
        </Select>
        <FormHelperText>
          {isError
            ? t(meta.error!)
            : props.helperText
            ? t(`input.rainLimitMode.helper`)
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

export const SketchToArcMethodSelect: React.FC<SelectWithHelperProps> = ({
  ...props
}) => {
  const [field, meta] = useField(props as { name: any });
  const { t } = useTranslation("tools");

  let isError = Boolean(meta.touched && meta.error);

  return (
    <Grid xs={12} sm={6} md={4}>
      <FormControl fullWidth>
        <InputLabel>{t("input.method")}</InputLabel>
        {/* @ts-ignore */}
        <Select
          fullWidth
          label={t("input.method")}
          error={isError}
          inputProps={{
            role: "listbox",
            "aria-label": `input.${props.name}`,
            "data-testid": `input.${props.name}`,
          }}
          {...field}
          {...props}
        >
          <MenuItem value="contour">
            <Trans t={t}>input.method.contour</Trans>
          </MenuItem>
          <MenuItem value="thinning">
            <Trans t={t}>input.method.thinning</Trans>
          </MenuItem>
        </Select>
        <FormHelperText>
          {isError
            ? t(meta.error!)
            : props.helperText
            ? t(`input.method.helper`)
            : undefined}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
};

export const SketchToArcPlaneSelect: React.FC<SelectWithHelperProps> = ({
  ...props
}) => {
  const [field, meta] = useField(props as { name: any });
  const { t } = useTranslation("tools");

  let isError = Boolean(meta.touched && meta.error);

  return (
    <Grid xs={12} sm={6} md={4}>
      <FormControl fullWidth>
        <InputLabel>{t("input.plane")}</InputLabel>
        {/* @ts-ignore */}
        <Select
          fullWidth
          label={t("input.plane")}
          error={isError}
          inputProps={{
            role: "listbox",
            "aria-label": `input.${props.name}`,
            "data-testid": `input.${props.name}`,
          }}
          {...field}
          {...props}
        >
          <MenuItem value="vertical">
            <Trans t={t}>input.plane.vertical</Trans>
          </MenuItem>
          <MenuItem value="timeline">
            <Trans t={t}>input.plane.timeline</Trans>
          </MenuItem>
        </Select>
        <FormHelperText>
          {isError
            ? t(meta.error!)
            : props.helperText
            ? t(`input.plane.helper`)
            : undefined}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
};
