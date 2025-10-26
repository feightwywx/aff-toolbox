import * as Yup from "yup";

import { ArcField, NumberField } from "@/components/input";
import {
  ArcPostProcessCard,
  ArcPostProcessInitValues,
  ArcPostProcessValidations,
} from "@/components/ArcPostProcessCard";
import { CardWithGrid, SubtitleTypography } from "@/components/CardWithGrid";
import type { GetStaticProps, NextPage } from "next";

import { EnvelopeModeSelect } from "@/components/input/select/selects";
import { ToolFormikForm } from "@/components/ToolFormikForm";
import { ToolStack } from "@/components/ToolStack";
import { ToolTitle } from "@/components/ToolTitle";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ToolPage: NextPage = () => {
  return (
    <ToolStack>
      <ToolTitle />

      <ToolFormikForm
        initValues={{
          arc1: "",
          arc2: "",
          params: {
            count: "",
            mode: "c",
          },
          ...ArcPostProcessInitValues,
        }}
        validationSchema={{
          arc1: Yup.string().required(),
          arc2: Yup.string().required(),
          params: Yup.object().shape({
            count: Yup.number().required(),
            envelop_mode: Yup.string(),
          }),
          ...ArcPostProcessValidations,
        }}
      >
        <CardWithGrid title="Note区域">
          <ArcField name="arc1" helperText />
          <ArcField name="arc2" helperText />
        </CardWithGrid>

        <CardWithGrid title="参数">
          <NumberField name="params.count" />
          <SubtitleTypography>可选参数</SubtitleTypography>
          <EnvelopeModeSelect name="params.mode" helperText />
        </CardWithGrid>
        <ArcPostProcessCard />
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
