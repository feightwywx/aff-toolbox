import { PropsWithChildren } from "react";
import { useTranslation } from "next-i18next";
import { Toolbar } from "@mui/material";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import AppBar from "./AppBar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  return (
    <>
      <Head>
        <meta name="title" content={t("title") ?? ""} />
      </Head>
      <AppBar />
      <Toolbar />
      {children}
    </>
  );
};

export default Layout;
