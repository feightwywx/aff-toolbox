import { SelectProps } from "@mui/material";
import { FieldHelperProps } from "formik";

export interface SelectWithHelperProps extends SelectProps {
  helperText?: boolean;
}
export interface InputAdornmentButtonProps {
  fieldHelpers: FieldHelperProps<string>;
  currentValue?: string;
  appendMode?: boolean;
}
export interface CreateArcParams {
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
export interface CalcTimingParams {
  bpm: number;
  division: string;
  offset: number;
}
export interface ArcFieldProps {
  allowMultiline?: boolean;
}
export interface ImageFieldProps {
  name: string;
  label?: string;
  helperText?: string;
}
