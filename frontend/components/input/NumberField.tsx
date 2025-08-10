import { Trans, useTranslation } from "next-i18next";

import { useState } from "react";
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
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useField } from "formik";
import * as Yup from "yup";
import ToolFormikForm from "@/components/ToolFormikForm";
import { ComplexError, StatusCode } from "@/utils/interfaces";
import { SubtitleTypography } from "@/components/CardWithGrid";
import { InputAdornmentButtonProps, CalcTimingParams } from "./interfaces";

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
          inputProps={{
            "aria-label": `input.${props.name}`,
          }}
          {...field}
        />
        <FormHelperText>
          {((
            isError,
            error: string | ComplexError | undefined,
            isHelper,
            fieldName
          ) => {
            if (isError && error) {
              if (typeof error === "string") {
                return t(error);
              } else if (
                Object.prototype.hasOwnProperty.call(error, "key") &&
                Object.prototype.hasOwnProperty.call(error, "value")
              ) {
                return [t(error.key), error.value].join("");
              }
            }

            if (isHelper) {
              return t(`input.${fieldName}.helper`);
            }
          })(isError, meta.error, props.helperText, props.name)}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
};

const CalcTimingButton: React.FC<InputAdornmentButtonProps> = ({
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
            <Grid container spacing={2}>
              <SubtitleTypography>参数</SubtitleTypography>
              <NumberField name="params.bpm" />
              <NumberField name="params.division" />
              <NumberField name="params.offset" />
            </Grid>
            <Button type="submit">
              <Trans t={t}>submit.fill</Trans>
            </Button>
          </ToolFormikForm>
        </Box>
      </Dialog>
    </>
  );
};

export default NumberField;
