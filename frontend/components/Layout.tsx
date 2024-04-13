import { PropsWithChildren, useEffect, useState } from "react";
import { Trans, useTranslation } from "next-i18next";
import {
  Collapse,
  CssBaseline,
  Fade,
  LinearProgress,
  Link,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import LayoutContainer from "./LayoutContainer";
import { useAppSelector } from "@/utils/hooks";
import { getDesignTokens } from "@/utils/theme";
import { computeDarkMode } from "@/utils/helpers";

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

  const configuredDarkMode = useAppSelector((state) => state.layout.darkMode);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const darkMode = computeDarkMode(configuredDarkMode, prefersDarkMode);

  const theme = React.useMemo(
    () =>
      createTheme({
        ...getDesignTokens(darkMode ? "dark" : "light"),
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                MuiDialog: {
                  borderRadius: 24,
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: "50vh",
              },
            },
          },
          MuiFab: {
            styleOverrides: {
              root: {
                borderRadius: "16px",
                padding: "28px 20px",
                textTransform: "none",
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              root: {
                "&:focus": {
                  borderColor: "red",
                },
              },
            },
          },
        },
        typography: {
          fontFamily: [
            '"Exo 2"',
            '"Noto Sans SC"',
            "Roboto",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
        },
      }),
    [darkMode]
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
                      <Trans>button.dismiss</Trans>
                    </Link>
                  </Stack>
                </div>
              </Collapse>

              {children}

              <Typography
                variant="subtitle2"
                color={() => theme.palette.divider}
              >
                {`aff-toolbox ${
                  process.env.NEXT_PUBLIC_ATB_VERSION
                    ? process.env.NEXT_PUBLIC_ATB_VERSION
                    : "development build"
                }(${
                  process.env.NEXT_PUBLIC_ATB_VERSION_COMMIT
                    ? process.env.NEXT_PUBLIC_ATB_VERSION_COMMIT
                    : "dev"
                }), target ${
                  process.env.NEXT_PUBLIC_ATB_TARGET
                    ? process.env.NEXT_PUBLIC_ATB_TARGET
                    : "none"
                }`}
              </Typography>
            </LayoutContainer>
          </div>
        </Fade>
      </ThemeProvider>
    </>
  );
};

export default Layout;
