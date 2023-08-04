import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ToolFormikForm from "@/components/ToolFormikForm";
import {
  ArcField,
  BezierField,
  EasingModeSelect,
  NumberField,
  SingleLineField,
} from "@/components/input";
import { CardWithGrid, SubtitleTypography } from "@/components/CardWithGrid";
import { ToolTitle } from "@/components/ToolTitle";
import * as Yup from "yup";
import { ToolStack } from "@/components/ToolStack";
import { emptyStringToUndef } from "@/utils/helpers";
import { Link, Typography } from "@mui/material";

const ToolPage: NextPage = () => {
  return (
    <ToolStack>
      <ToolTitle />

      <ToolFormikForm
        initValues={{
          params: {
            start: "",
            stop: "",
            count: "",
            bpm_range: "",
            exact_bar: "",
            zero_bar: "",
          },
        }}
        validationSchema={{
          params: Yup.object().shape({
            start: Yup.number().integer().required(),
            stop: Yup.number().integer().required(),
            count: Yup.number().integer().required(),
            bpm_range: Yup.number().required(),
            exact_bar: Yup.number().transform(emptyStringToUndef).nullable(),
            zero_bar: Yup.number().transform(emptyStringToUndef).nullable(),
          }),
        }}
      >
        <CardWithGrid title="参数">
          <NumberField name="params.start" />
          <NumberField name="params.stop" />
          <NumberField name="params.count" />
          <NumberField name="params.bpm_range" />
          <SubtitleTypography>可选参数</SubtitleTypography>
          <NumberField name="params.exact_bar" />
          <NumberField name="params.zero_bar" />
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
