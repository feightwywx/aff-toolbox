import React, { PropsWithChildren } from "react";

import { Typography } from "@mui/material";
import { toolMetas } from "@/config/modules";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export const ToolTitle: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const pathname = `/${router.asPath.split("/").slice(-1)}`;

  const meta = toolMetas.find((tool) => tool.path === pathname);

  return (
    <div>
      <Typography variant="h3">{t(`tool.${meta?.id}.name`)}</Typography>
      <Typography variant="h6">{t(`tool.${meta?.id}.shortDesc`)}</Typography>
      {children}
    </div>
  );
};
