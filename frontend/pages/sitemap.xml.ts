import toolMetas from "@/config/modules";
import { ArcToolMetadata } from "@/utils/interfaces";
import { GetServerSideProps } from "next";

function generateSiteMap(tools: ArcToolMetadata[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://aff.arcaea.icu</loc>
     </url>
     ${tools
       .map(({ path }) => {
         return `
       <url>
           <loc>https://aff.arcaea.icu/tools${path}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSiteMap(toolMetas);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
