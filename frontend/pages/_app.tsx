import type { AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "../components/Layout";
import { theme } from "@/utils/theme";
import { Provider as ReduxProvider } from "react-redux";
import store from '@/utils/store';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
}

export default appWithTranslation(App);
