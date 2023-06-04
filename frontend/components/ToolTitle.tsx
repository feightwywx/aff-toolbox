import { toolMetas } from "@/config/modules";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React from "react";

export const ToolTitle: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const pathname = `/${router.asPath.split("/").slice(-1)}`;

  const meta = toolMetas.find((tool) => tool.path === pathname);

  return (
    <div>
      <Typography variant="h3">{t(`tool.${meta?.id}.name`)}</Typography>
      <Typography variant="h6">{t(`tool.${meta?.id}.shortDesc`)}</Typography>
    </div>
  );
};
