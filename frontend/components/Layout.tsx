import { PropsWithChildren, useEffect, useState } from "react";
import { Trans, useTranslation } from "next-i18next";
import {
  Collapse,
  Fade,
  LinearProgress,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
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

  const [showCommunity, setShowCommunity] = useState(false);
  useEffect(() => {
    if (!(localStorage.getItem("infoChecked.community") === "true")) {
      setShowCommunity(true);
    }
  });

  return (
    <>
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
          <LayoutContainer open={drawerOpen}>
            <Collapse in={showCommunity} unmountOnExit>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Stack direction="row" spacing={1}>
                  {i18n.language === "zh" ? (
                    <>
                      <Typography
                        align="center"
                        sx={{
                          color: (theme) => theme.palette.text.disabled,
                          mb: 1,
                        }}
                      >
                        加入我们的QQ群：477499123
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography
                        align="center"
                        sx={{
                          color: (theme) => theme.palette.text.disabled,
                          mb: 1,
                        }}
                      >
                        Join our Discord server!
                      </Typography>
                      <Link href="https://discord.gg/UEQ8UhacJG">
                        Invite Link
                      </Link>
                    </>
                  )}
                  <Link
                    onClick={() => {
                      setShowCommunity(false);
                      localStorage.setItem("infoChecked.community", "true");
                    }}
                  >
                    <Trans>
                      button.dismiss
                    </Trans>
                  </Link>
                </Stack>
              </div>
            </Collapse>

            {children}
          </LayoutContainer>
        </div>
      </Fade>
    </>
  );
};

export default Layout;
