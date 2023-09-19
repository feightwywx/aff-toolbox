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
import { Trans, useTranslation } from "react-i18next";

const ToolPage: NextPage = () => {
  const { t } = useTranslation("tools");
  return (
    <ToolStack>
      <ToolTitle />

      <ToolFormikForm
        initValues={{
          params: {
            start: "",
            stop: "",
            basebpm: "",
            count: "",
            bar: "",
            easing: "ease_in_sine",
            easing_b_point: "",
          },
        }}
        validationSchema={{
          params: Yup.object().shape({
            start: Yup.number().integer().required(),
            stop: Yup.number().integer().required(),
            basebpm: Yup.number().required(),
            count: Yup.number().integer().required(),
            bar: Yup.number().transform(emptyStringToUndef).nullable(),
            easing: Yup.string(),
            easing_b_point: Yup.string().transform(emptyStringToUndef),
          }),
        }}
      >
        <CardWithGrid title="参数">
          <NumberField name="params.start" withTimingCalc />
          <NumberField name="params.stop" withTimingCalc />
          <NumberField name="params.basebpm" />
          <NumberField name="params.count" />
          <SubtitleTypography>可选参数</SubtitleTypography>
          <NumberField name="params.bar" />
          <BezierHint />
          <SingleLineField>
            <Typography>
              <Trans t={t}>hint.timingEasingDisp.easing</Trans>
            </Typography>
          </SingleLineField>
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
