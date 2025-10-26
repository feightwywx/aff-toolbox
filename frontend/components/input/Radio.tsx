import { FormControlLabel, Radio as MuiRadio, RadioProps } from "@mui/material";

import type React from "react";
import { useField } from "formik";
import { useTranslation } from "next-i18next";

const Radio: React.FC<RadioProps> = (props) => {
  const [field] = useField(props as { name: any });
  const { t } = useTranslation("tools");

  return (
    <FormControlLabel
      control={<MuiRadio {...field} {...props} />}
      label={t(`input.${props.id}`)}
    />
  );
};

export default Radio;
