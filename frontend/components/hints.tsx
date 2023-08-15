import React from "react";
import { SingleLineField } from "./input";
import { Link, Typography } from "@mui/material";
import { useTranslation, Trans } from "next-i18next";

export const BezierHint: React.FC = () => {
  const { t } = useTranslation("tools");
  return (
    <SingleLineField>
      <Typography>
        <Trans t={t}>
          下面的参数控制缓动曲线，当缓动类型为“b”时可以提供两个控制点作为参数，进行更精细的控制。
        </Trans>
      </Typography>
      <Typography>
        <Trans t={t}>控制点默认值为</Trans>
        <span
          style={{
            fontFamily: "monospace",
            padding: "0.25em",
            display: "inline",
          }}
        >
          0.33,0,0.67,1
        </span>
        。
      </Typography>
      <Typography>
        <Trans t={t}>你可以在这个网站了解和调试贝塞尔曲线：</Trans>
        <Link href="https://cubic-bezier.com">cubic-bezier.com</Link>
      </Typography>
    </SingleLineField>
  );
};
