import * as Yup from "yup";

import { BezierField, NumberField } from "@/components/input";
import { CardWithGrid, SubtitleTypography } from "@/components/CardWithGrid";
import type { GetStaticProps, NextPage } from "next";
import { Trans, useTranslation } from "next-i18next";

import { BezierHint } from "@/components/hints";
import { EasingModeSelect } from "@/components/input/select/selects";
import { SingleLineGrid } from "@/components/SingleLineGrid";
import { ToolFormikForm } from "@/components/ToolFormikForm";
import { ToolStack } from "@/components/ToolStack";
import { ToolTitle } from "@/components/ToolTitle";
import { Typography } from "@mui/material";
import { emptyStringToUndef } from "@/utils/helpers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
          <SingleLineGrid>
            <Typography>
              <Trans t={t}>hint.timingEasingDisp.easing</Trans>
            </Typography>
          </SingleLineGrid>
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
