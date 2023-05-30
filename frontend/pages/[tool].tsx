import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { toolMetas } from "@/config/modules";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const ToolPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  meta,
}) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <>
      {meta && (
        <>
          <Stack spacing={2} sx={{ mb: 2 }}>
            <Box>
              <Typography variant={isDesktop ? "h2" : "h3"}>
                {t(`tool.${meta.id}.name`)}
              </Typography>
              <Typography variant="h6">
                {t(`tool.${meta.id}.shortDesc`)}
              </Typography>
            </Box>
          </Stack>
        </>
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: toolMetas.map((meta) => ({ params: { tool: meta.path } })),
    fallback: true, // false or "blocking"
  };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const { tool } = params;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "tool"])),
      // Will be passed to the page component as props
      meta: toolMetas.find((meta) => meta.path === `/${tool}`),
    },
  };
};

export default ToolPage;
