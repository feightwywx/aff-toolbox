import "@fortawesome/fontawesome-svg-core/styles.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import ReactGA from "react-ga4";
import { Provider as ReduxProvider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { appWithTranslation } from "next-i18next";
import { config } from "@fortawesome/fontawesome-svg-core";
import { setLocale } from "yup";
import store from "@/utils/store";

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
      min: ({ min }) => ({ key: "error.tooSmall", value: min }),
      max: ({ max }) => ({ key: "error.tooLarge", value: max }),
      integer: "error.integer",
    },
  });

  // init Google Analysis
  ReactGA.initialize("G-SNZN20X39X");

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ReduxProvider store={store}>
        <SnackbarProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </ReduxProvider>
    </>
  );
}

export default appWithTranslation(App);
