import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="zh">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
      {/* 动态加载字体的脚本 */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
              (function() {
                function loadFonts() {
                  // 创建Exo 2字体链接
                  var exoLink = document.createElement('link');
                  exoLink.rel = 'stylesheet';
                  exoLink.href = 'https://fonts.font.im/css?family=Exo+2:300,400,500,700&display=swap';
                  
                  // 创建Noto Sans SC字体链接
                  var notoLink = document.createElement('link');
                  notoLink.rel = 'stylesheet';
                  notoLink.href = 'https://fonts.font.im/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap';
                  
                  // 添加到文档头部
                  document.head.appendChild(exoLink);
                  document.head.appendChild(notoLink);
                }
                
                // 页面完全加载后执行
                if (document.readyState === 'complete') {
                  loadFonts();
                } else {
                  window.addEventListener('load', loadFonts);
                }
              })();
            `,
        }}
      />
    </Html>
  );
}
