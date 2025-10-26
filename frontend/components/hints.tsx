import { Link, Typography } from "@mui/material";
import { Trans, useTranslation } from "next-i18next";

import type React from "react";
import SingleLineGrid from "./SingleLineGrid";

export const BezierHint: React.FC = () => {
  const { t } = useTranslation("tools");
  return (
    <SingleLineGrid>
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
      <Typography>
        <Trans t={t}>
          除了Arcaea自带的缓动类型之外，AFF工具箱还预置了大量常用的缓动类型，你可以在这个网站预览：
        </Trans>
        <Link href="https://easings.net">easings.net</Link>
      </Typography>
    </SingleLineGrid>
  );
};
