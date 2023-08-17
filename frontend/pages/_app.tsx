import React from 'react';
import type { AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Layout from "../components/Layout";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/utils/store";
import { SnackbarProvider } from "notistack";
import { setLocale } from "yup";
import { config } from "@fortawesome/fontawesome-svg-core";
import ReactGA from "react-ga4";
import useMediaQuery from "@mui/material/useMediaQuery";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { getDesignTokens } from '@/utils/theme';

config.autoAddCss = false;

function App({ Component, pageProps }: AppProps) {
  setLocale({
    // use constant translation keys for messages without values
    mixed: {
      default: "error.invalid",
      required: "error.required",
      notType: "error.invalid",
    },
    // use functions to generate an error object that includes the value from the schema
    number: {
      min: ({ min }) => ({ key: "field_too_short", values: { min } }),
      max: ({ max }) => ({ key: "field_too_big", values: { max } }),
      integer: "error.integer",
    },
  });

  // init Google Analysis
  ReactGA.initialize("G-SNZN20X39X");

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        ...getDesignTokens(prefersDarkMode ? 'dark' : 'light'),
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
                '&:focus': {
                  borderColor: 'red'
                }
              }
            }
          }
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
    [prefersDarkMode],
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SnackbarProvider>
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
}

export default appWithTranslation(App);
