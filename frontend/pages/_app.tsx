import type { AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Layout from '../components/Layout';
import { theme } from "@/utils/theme";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(App);
