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
import { BezierHint } from "@/components/hints";

const ToolPage: NextPage = () => {
  return (
    <ToolStack>
      <ToolTitle />

      <ToolFormikForm
        initValues={{
          params: {
            start: "",
            stop: "",
            start_bpm: "",
            stop_bpm: "",
            count: "",
            bar: "",
            easing: "s",
            easing_b_point: "",
          },
        }}
        validationSchema={{
          params: Yup.object().shape({
            start: Yup.number().integer().required(),
            stop: Yup.number().integer().required(),
            start_bpm: Yup.number().required(),
            stop_bpm: Yup.number().required(),
            count: Yup.number().integer().required(),
            bar: Yup.number().transform(emptyStringToUndef).nullable(),
            easing: Yup.string(),
            easing_b_point: Yup.string().transform(emptyStringToUndef),
          }),
        }}
      >
        <CardWithGrid title="参数">
          <NumberField name="params.start" />
          <NumberField name="params.stop" />
          <NumberField name="params.start_bpm" />
          <NumberField name="params.stop_bpm" />
          <NumberField name="params.count" />
          <SubtitleTypography>可选参数</SubtitleTypography>
          <NumberField name="params.bar" />
          <BezierHint />
          <EasingModeSelect name="params.easing" />
          <BezierField name="params.easing_b_point" />
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
