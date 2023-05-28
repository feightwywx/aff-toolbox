import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="zh">
      <Head>
        <link
          href="https://fonts.font.im/css?family=Exo+2:300,400,500,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.font.im/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
