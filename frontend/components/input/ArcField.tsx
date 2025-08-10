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
  OutlinedInput,
  TextFieldProps,
  Unstable_Grid2,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useField } from "formik";
import * as Yup from "yup";
import ToolFormikForm from "@/components/ToolFormikForm";
import { StatusCode } from "@/utils/interfaces";
import { SubtitleTypography } from "@/components/CardWithGrid";
import { ArcFieldProps, SelectWithHelperProps, InputAdornmentButtonProps, CreateArcParams } from "./interfaces";
import { AnyTextField, CheckBoxField, NumberField } from ".";

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

export const CreateArcButton: React.FC<InputAdornmentButtonProps> = ({
  fieldHelpers,
  currentValue,
  appendMode,
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
                fieldHelpers.setValue(
                  appendMode
                    ? [
                        currentValue,
                        currentValue?.length ? "\n" : "",
                        result.result,
                      ].join("")
                    : result.result
                );
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

