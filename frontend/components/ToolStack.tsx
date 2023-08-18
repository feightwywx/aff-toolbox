import { Stack, StackProps } from "@mui/material";
import Head from "next/head";
import React from "react";
import { useTranslation, Trans } from "next-i18next";
import { useRouter } from "next/router";
import { toolMetas } from "@/config/modules";

export const ToolStack: React.FC<StackProps> = ({ children, ...props }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const pathname = `/${router.asPath.split("/").slice(-1)}`;
  const meta = toolMetas.find((tool) => tool.path === pathname);

  return (
    <>
      <Head>
        <title>{t(`tool.${meta?.id}.name - ${'title'}`)}</title>
        <meta
          name="description"
          content={t(`tool.${meta?.id}.shortDesc`) ?? ''}
          key="desc"
        />
        <link
          rel="canonical"
          href={`https://aff.arcaea.icu/tools${meta?.path}`}
          key="canonical"
        />
      </Head>
      <Stack spacing={2} sx={{ mb: 2 }} {...props}>
        {children}
      </Stack>
    </>
  );
};
