import { Trans, useTranslation } from "next-i18next";

import React, { PropsWithChildren, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxProps,
  Dialog,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Unstable_Grid2 as Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Radio as MuiRadio,
  RadioProps,
  Select,
  SelectProps,
  TextField,
  TextFieldProps,
  Unstable_Grid2,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { FieldHelperProps, Form, Formik, useField } from "formik";
import * as Yup from "yup";
import ToolFormikForm from "./ToolFormikForm";
import { StatusCode } from "@/utils/interfaces";
import { SubtitleTypography } from "./CardWithGrid";

interface SelectWithHelperProps extends SelectProps {
  helperText?: boolean;
}

interface InputAdornmentButtonProps {
  fieldHelpers: FieldHelperProps<string>;
}

interface CreateArcParams {
  start: string;
  stop: string;
  start_x: string;
  stop_x: string;
  easing: string;
  start_y: string;
  stop_y: string;
  color: number;
  skyline: boolean;
  fx: string;
  arctap: string;
}

interface CalcTimingParams {
  bpm: number;
  division: string;
  offset: number;
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

export const NumberField: React.FC<
  TextFieldProps & { withTimingCalc?: boolean }
> = ({ withTimingCalc, ...props }) => {
  const [field, meta, helpers] = useField(props as { name: any });
  const { t } = useTranslation("tools");

  let isError = Boolean(meta.touched && meta.error);

  return (
    <Grid xs={12} sm={6} md={4}>
      <FormControl fullWidth variant="outlined" error={isError}>
        <InputLabel>{t(`input.${props.name}`)}</InputLabel>
        <OutlinedInput
          label={t(`input.${props.name}`)}
          fullWidth
          endAdornment={
            withTimingCalc ? (
              <InputAdornment position="end">
                <CalcTimingButton fieldHelpers={helpers} />
              </InputAdornment>
            ) : undefined
          }
          {...field}
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

export const AnyTextField: React.FC<
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

export const CheckBoxField: React.FC<
  CheckboxProps & { singleLine?: boolean }
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
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...field} {...props} />}
          label={t(`input.${props.name}`)}
        />
      </FormGroup>
    </Grid>
  );
};

export const Radio: React.FC<RadioProps> = (props) => {
  const [field, meta] = useField(props as { name: any });
  const { t } = useTranslation("tools");

  let isError = Boolean(meta.touched && meta.error);

  return (
    <FormControlLabel
      control={<MuiRadio {...field} {...props} />}
      label={t(`input.${props.id}`)}
    />
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
              <CreateArcButton fieldHelpers={helpers} />
            </InputAdornment>
          }
          {...field}
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
          <MenuItem value="ease_in_bounce">easeInCirc</MenuItem>
          <MenuItem value="ease_out_bounce">easeOutCirc</MenuItem>
          <MenuItem value="ease_in_out_bounce">easeInOutCirc</MenuItem>
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

export const SingleLineField: React.FC<PropsWithChildren> = ({
  children,
  ...props
}) => {
  return <Grid xs={12}>{children}</Grid>;
};

export const CreateArcButton: React.FC<InputAdornmentButtonProps> = ({
  fieldHelpers,
}) => {
  const { t } = useTranslation("tools");

  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton
        onClick={async () => {
          setOpen(true);
        }}
      >
        <AddBoxIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        fullWidth
        maxWidth="lg"
        keepMounted
      >
        <Box sx={{ m: 2, mb: 0 }}>
          <ToolFormikForm
            initValues={{
              params: {
                start: "",
                stop: "",
                start_x: "",
                stop_x: "",
                easing: "s",
                start_y: "",
                stop_y: "",
                color: 0,
                skyline: false,
                fx: "",
                arctap: "",
              },
            }}
            validationSchema={{
              params: Yup.object().shape({
                start: Yup.number().integer().required(),
                stop: Yup.number().integer().required(),
                start_x: Yup.number().required(),
                stop_x: Yup.number().required(),
                easing: Yup.string().required(),
                start_y: Yup.number().required(),
                stop_y: Yup.number().required(),
                color: Yup.number().required(),
                skyline: Yup.boolean(),
                fx: Yup.string().nullable(),
                arctap: Yup.string().nullable(),
              }),
            }}
            //@ts-expect-error
            processorOverride={async (values: { params: CreateArcParams }) => {
              const vals = {
                ...values.params,
                start: parseInt(values.params.start),
                stop: parseInt(values.params.stop),
                start_x: parseFloat(values.params.start_x),
                stop_x: parseFloat(values.params.stop_x),
                start_y: parseFloat(values.params.start_y),
                stop_y: parseFloat(values.params.stop_y),
              };
              const arctaps = vals.arctap.split(",");
              let arctapString = arctaps
                .map((str) => `arctap(${str})`)
                .join(",");
              if (arctapString !== "arctap()") {
                arctapString = `[${arctapString}]`;
              } else {
                arctapString = "";
              }

              return {
                code: StatusCode.SUCCESS,
                result: `arc(${vals.start.toFixed(0)},${vals.stop.toFixed(
                  0
                )},${vals.start_x.toFixed(2)},${vals.stop_x.toFixed(2)},${
                  vals.easing
                },${vals.start_y.toFixed(2)},${vals.stop_y.toFixed(2)},${
                  vals.color
                },${vals.fx ? vals.fx : "none"},${
                  vals.skyline ? "true" : "false"
                })${arctapString};`,
              };
            }}
            successCallbackOverride={async (_, result) => {
              if (result.code == StatusCode.SUCCESS) {
                fieldHelpers.setValue(result.result);
                setOpen(false);
              }
            }}
            disableSubmitFab
          >
            <Unstable_Grid2 container spacing={2}>
              <SubtitleTypography>参数</SubtitleTypography>
              <NumberField name="params.start" />
              <NumberField name="params.stop" />
              <NumberField name="params.start_x" />
              <NumberField name="params.stop_x" />
              <ArcEasingModeSelect name="params.easing" />
              <NumberField name="params.start_y" />
              <NumberField name="params.stop_y" />
              <ArcColorSelect name="params.color" />
              <SubtitleTypography>可选参数</SubtitleTypography>
              <AnyTextField name="params.fx" />
              <AnyTextField name="params.arctap" singleLine helperText />
              <CheckBoxField name="params.skyline" singleLine />
            </Unstable_Grid2>
            <Button type="submit">
              <Trans t={t}>submit.fill</Trans>
            </Button>
          </ToolFormikForm>
        </Box>
      </Dialog>
    </>
  );
};

export const CalcTimingButton: React.FC<InputAdornmentButtonProps> = ({
  fieldHelpers,
}) => {
  const { t } = useTranslation("tools");

  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton
        onClick={async () => {
          setOpen(true);
        }}
      >
        <AddBoxIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        fullWidth
        maxWidth="lg"
        keepMounted
      >
        <Box sx={{ m: 2, mb: 0 }}>
          <ToolFormikForm
            initValues={{
              params: {
                bpm: "",
                division: "",
                offset: "",
              },
            }}
            validationSchema={{
              params: Yup.object().shape({
                bpm: Yup.number().required(),
                division: Yup.string()
                  .matches(
                    /(?:[1-9][0-9]*|0)\/[1-9][0-9]*/g,
                    t("error.fraction") ?? ""
                  )
                  .required(),
                offset: Yup.number().integer().required(),
              }),
            }}
            //@ts-expect-error
            processorOverride={async (values: { params: CalcTimingParams }) => {
              const { bpm, division, offset } = values.params;
              const [dividend, divisor] = division
                .split("/")
                .map((x) => parseFloat(x));
              return {
                code: StatusCode.SUCCESS,
                result: ((60000 / bpm) * (dividend / divisor) + offset).toFixed(
                  0
                ),
              };
            }}
            successCallbackOverride={async (_, result) => {
              if (result.code == StatusCode.SUCCESS) {
                fieldHelpers.setValue(result.result);
                setOpen(false);
              }
            }}
            disableSubmitFab
          >
            <Unstable_Grid2 container spacing={2}>
              <SubtitleTypography>参数</SubtitleTypography>
              <NumberField name="params.bpm" />
              <NumberField name="params.division" />
              <NumberField name="params.offset" />
            </Unstable_Grid2>
            <Button type="submit">
              <Trans t={t}>submit.fill</Trans>
            </Button>
          </ToolFormikForm>
        </Box>
      </Dialog>
    </>
  );
};
