import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ToolFormikForm from "@/components/ToolFormikForm";
import { AffTextField } from "@/components/input";
import { CardWithGrid } from "@/components/CardWithGrid";
import { ToolTitle } from "@/components/ToolTitle";
import * as Yup from "yup";
import { ToolStack } from "@/components/ToolStack";
import { Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";

const ToolPage: NextPage = () => {
  const { t } = useTranslation("tools");

  return (
    <ToolStack>
      <ToolTitle>
        <Typography>
          <Trans t={t}>
            参考NCat的黑线描物件工具实现
          </Trans>
        </Typography>
      </ToolTitle>

      <ToolFormikForm
        initValues={{ notes: "" }}
        validationSchema={{
          notes: Yup.string().required(),
        }}
      >
        <CardWithGrid title="Note区域">
          <AffTextField name="notes" />
        </CardWithGrid>
      </ToolFormikForm>
    </ToolStack>
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
