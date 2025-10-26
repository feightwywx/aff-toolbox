import { Box, Button, FormControl, FormHelperText, Stack } from "@mui/material";
import { useRef, useState } from "react";

import { ImageFieldProps } from "./interfaces";
import type React from "react";
import { SubtitleTypography } from "@/components/CardWithGrid";
import { useField } from "formik";
import { useTranslation } from "next-i18next";

const ImageField: React.FC<ImageFieldProps> = ({ ...props }) => {
  const [field, meta, helpers] = useField(props as { name: any });
  const [preview, setPreview] = useState<string | null>(null);
  const { t } = useTranslation("tools");
  const imgUploadRef = useRef<HTMLInputElement>(null);

  let isError = Boolean(meta.touched && meta.error);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // when cancel or file type doesn't match
    if (!file || !file.type.match("image/png|image/jpeg")) {
      // do nothing
      return;
    }

    // Create preview and set field value
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      helpers.setValue(base64String);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setPreview(null);
    helpers.setValue(null);
    if (imgUploadRef.current) {
      imgUploadRef.current.value = "";
    }
  };

  return (
    <FormControl fullWidth variant="outlined" error={isError}>
      <SubtitleTypography>{t(`input.${props.name}`)}</SubtitleTypography>

      <input
        accept="image/png,image/jpeg"
        style={{ display: "none" }}
        id={`image-upload-${field.name}`}
        type="file"
        onChange={handleFileChange}
        ref={imgUploadRef}
        {...{
          "aria-label": `input.${props.name}`,
          "data-testid": `input.${props.name}`,
        }}
      />

      <Stack direction="column" spacing={2} alignItems="flex-start">
        <label htmlFor={`image-upload-${field.name}`}>
          <Button variant="contained" component="span">
            {t("input.image.upload")}
          </Button>
        </label>

        {preview && (
          <Button variant="outlined" color="secondary" onClick={clearImage}>
            {t("input.image.clear")}
          </Button>
        )}

        {preview && (
          <Box sx={{ mt: 2, maxWidth: "100%" }}>
            <img
              src={preview}
              alt="preview"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                objectFit: "contain",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </Box>
        )}

        <FormHelperText>
          {isError
            ? t(meta.error!)
            : props.helperText
            ? props.helperText
            : t(`input.${props.name}.helper`)}
        </FormHelperText>
      </Stack>
    </FormControl>
  );
};

export default ImageField;
