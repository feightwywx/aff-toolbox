import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { toolMetas } from "@/config/modules";
import { Box, Stack, Theme, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import ToolFormikForm from "@/components/ToolFormikForm";
import { AffTextField, NumberField } from "@/components/input";
import { CardWithGrid } from "@/components/CardWithGrid";
import { Field, FieldArray } from "formik";
import { ToolTitle } from "@/components/ToolTitle";
import * as Yup from "yup";

const ToolPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const pathname = `/${router.asPath.split("/").slice(-1)}`;

  const meta = toolMetas.find((tool) => tool.path === pathname);

  return (
    <>
      {meta && (
        <>
          <Stack spacing={2} sx={{ mb: 2 }}>
            <ToolTitle />

            <ToolFormikForm
              initValues={{ notes: "", params: { offset: "" } }}
              validationSchema={{
                notes: Yup.string().required(),
                params: Yup.object().shape({
                  offset: Yup.number().required().integer(),
                }),
              }}
            >
              <CardWithGrid title="Note区域">
                <AffTextField name="notes" />
              </CardWithGrid>

              <CardWithGrid title="参数">
                <NumberField name="params.offset" />
              </CardWithGrid>
            </ToolFormikForm>
          </Stack>
        </>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh", ["common", "tools"])),
    },
  };
};

export default ToolPage;
