import { PropsWithChildren, useState } from "react";
import { useTranslation } from "next-i18next";
import { Toolbar } from "@mui/material";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import { theme } from "@/utils/theme";
import LayoutContainer from "./LayoutContainer";
import { useAppSelector } from "@/utils/hooks";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const drawerOpen = useAppSelector((state) => state.layout.drawerOpen);
  console.log(drawerOpen)

  console.log(theme.breakpoints.up("md"));

  return (
    <>
      <Head>
        <meta name="title" content={t("title") ?? ""} />
      </Head>
      <AppBar />
      <Toolbar />
      <Drawer />
      <LayoutContainer open={drawerOpen}>{children}</LayoutContainer>
    </>
  );
};

export default Layout;
