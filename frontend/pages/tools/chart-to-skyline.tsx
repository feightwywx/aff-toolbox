import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ToolFormikForm from "@/components/ToolFormikForm";
import { AffTextField, NumberField } from "@/components/input";
import { CardWithGrid, SubtitleTypography } from "@/components/CardWithGrid";
import { ToolTitle } from "@/components/ToolTitle";
import * as Yup from "yup";
import { ToolStack } from "@/components/ToolStack";
import { Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { emptyStringToUndef } from "@/utils/helpers";

const ToolPage: NextPage = () => {
  const { t } = useTranslation("tools");

  return (
    <ToolStack>
      <ToolTitle>
        <Typography>
          <Trans t={t}>参考NCat的黑线描物件工具实现</Trans>
        </Typography>
      </ToolTitle>

      <ToolFormikForm
        initValues={{
          notes: "",
          params: { tap_scale: "", arctap_scale: "", arc_head_scale: "" },
        }}
        validationSchema={{
          notes: Yup.string().required(),
          params: Yup.object().shape({
            tap_scale: Yup.number().transform(emptyStringToUndef).nullable(),
            arctap_scale: Yup.number().transform(emptyStringToUndef).nullable(),
            arc_head_scale: Yup.number()
              .transform(emptyStringToUndef)
              .nullable(),
          }),
        }}
      >
        <CardWithGrid title="Note区域">
          <AffTextField name="notes" />
        </CardWithGrid>
        <CardWithGrid title="可选参数">
          <NumberField name="params.tap_scale" helperText />
          <NumberField name="params.arctap_scale" helperText />
          <NumberField name="params.arc_head_scale" helperText />
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
