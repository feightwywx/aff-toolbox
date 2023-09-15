import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ToolFormikForm from "@/components/ToolFormikForm";
import { ArcField, NumberField } from "@/components/input";
import { CardWithGrid, SubtitleTypography } from "@/components/CardWithGrid";
import { ToolTitle } from "@/components/ToolTitle";
import * as Yup from "yup";
import { ToolStack } from "@/components/ToolStack";
import { emptyStringToUndef } from "@/utils/helpers";
import {
  ArcPostProcessCard,
  ArcPostProcessInitValues,
  ArcPostProcessValidations,
} from "@/components/ArcPostProcessCard";

const ToolPage: NextPage = () => {
  return (
    <ToolStack>
      <ToolTitle />

      <ToolFormikForm
        initValues={{
          arc: "",
          params: { count: "", start: "", stop: "" },
          ...ArcPostProcessInitValues,
        }}
        validationSchema={{
          arc: Yup.string().required(),
          params: Yup.object().shape({
            count: Yup.number().integer().required(),
            start: Yup.number()
              .integer()
              .transform(emptyStringToUndef)
              .nullable(),
            stop: Yup.number()
              .integer()
              .transform(emptyStringToUndef)
              .nullable(),
          }),
          ...ArcPostProcessValidations
        }}
      >
        <CardWithGrid title="Note区域">
          <ArcField name="arc" />
        </CardWithGrid>

        <CardWithGrid title="参数">
          <NumberField name="params.count" />
          <SubtitleTypography>可选参数</SubtitleTypography>
          <NumberField name="params.start" withTimingCalc />
          <NumberField name="params.stop" withTimingCalc />
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
