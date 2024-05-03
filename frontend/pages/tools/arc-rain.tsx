import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ToolFormikForm from "@/components/ToolFormikForm";
import { ArcField, NumberField, RainLimitModeSelect } from "@/components/input";
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
          params: {
            start: "",
            stop: "",
            step: "",
            dropLength: "",
            mode: "s",
            x_limit_range: "",
            y_limit_range: "",
          },
          ...ArcPostProcessInitValues,
        }}
        validationSchema={{
          params: Yup.object().shape({
            start: Yup.number().integer().required(),
            stop: Yup.number().integer().required(),
            step: Yup.number().required(),
            dropLength: Yup.number()
              .integer()
              .transform(emptyStringToUndef)
              .nullable(),
            mode: Yup.string(),
            x_limit_range: Yup.string()
              .transform(emptyStringToUndef)
              .nullable(),
            y_limit_range: Yup.string()
              .transform(emptyStringToUndef)
              .nullable(),
          }),
          ...ArcPostProcessValidations,
        }}
      >
        <CardWithGrid title="参数">
          <NumberField name="params.start" withTimingCalc />
          <NumberField name="params.stop" withTimingCalc />
          <NumberField name="params.step" withTimingCalc />
          <SubtitleTypography>可选参数</SubtitleTypography>
          <NumberField name="params.dropLength" helperText withTimingCalc />
          <RainLimitModeSelect name="params.mode" />
          <NumberField name="params.x_limit_range" helperText />
          <NumberField name="params.y_limit_range" helperText />
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
