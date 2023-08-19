import { PropsWithChildren, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Fade, LinearProgress, Toolbar } from "@mui/material";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import LayoutContainer from "./LayoutContainer";
import { useAppSelector } from "@/utils/hooks";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const drawerOpen = useAppSelector((state) => state.layout.drawerOpen);

  const [showContent, setShowContent] = useState(true);
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setShowContent(false);
    });
    router.events.on("routeChangeComplete", () => {
      setShowContent(true);
    });
  }, [router]);

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="title" content={t("title") ?? ""} />
      </Head>

      <AppBar />
      <Toolbar />
      <LinearProgress
        style={{
          zIndex: 9999,
          display: showContent ? "none" : "inherit",
          position: "fixed",
          width: "100%",
        }}
      />
      <Drawer />
      <Fade in={showContent}>
        {/* 防止main的transition被Fade覆盖 */}
        <div>
          <LayoutContainer open={drawerOpen}>{children}</LayoutContainer>
        </div>
      </Fade>
    </>
  );
};

export default Layout;
