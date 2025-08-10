import { useTranslation } from "next-i18next";

import { useRef } from "react";
import type React from "react";
import {
  FormControl,
  FormHelperText,
  Unstable_Grid2 as Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextFieldProps,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useField } from "formik";

const AffTextField: React.FC<TextFieldProps> = ({ ...props }) => {
  const [field, meta, helpers] = useField(props as { name: any });
  const { t } = useTranslation("tools");
  const inputRef = useRef<HTMLInputElement>(null);

  let isError = Boolean(meta.touched && meta.error);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          helpers.setValue(e.target.result as string);
          inputRef.current!.value = "";
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Grid xs={12}>
      <FormControl fullWidth variant="outlined" error={isError}>
        <InputLabel>{t(`input.${props.name}`)}</InputLabel>
        <OutlinedInput
          label={t(`input.${props.name}`)}
          multiline
          fullWidth
          rows={10}
          placeholder={`AudioOffset:248\n-\ntiming(0,222.22,4.00);\n...`}
          endAdornment={
            <InputAdornment position="end">
              <input
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-input"
                ref={inputRef}
              />
              <label htmlFor="file-input">
                <IconButton onClick={async () => {}} component="span">
                  <UploadFileIcon />
                </IconButton>
              </label>
            </InputAdornment>
          }
          inputProps={{
            "aria-label": `input.${props.name}`,
          }}
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

export default AffTextField;
