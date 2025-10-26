import * as Yup from "yup";

import { ArcField, BezierField, NumberField } from "@/components/input";
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
      <Trans t={t}>也可以用于地面物件的移动，这时x轴为轨道</Trans>

      <ToolFormikForm
        initValues={{
          arc: "",
          params: {
            start: "",
            stop: "",
            delta_x: "",
            delta_y: "",
            basebpm: "",
            easing_x: "s",
            easing_b_point_x: "",
            easing_y: "s",
            easing_b_point_y: "",
            offset_t: "",
            delta_offset_t: "",
            easing_offset_t: "s",
            easing_b_point_offset_t: "",
            infbpm: "",
            framerate: "",
            fake_note_t: "",
          },
        }}
        validationSchema={{
          arc: Yup.string().required(),
          params: Yup.object().shape({
            start: Yup.number().required(),
            stop: Yup.number().required(),
            delta_x: Yup.number().required(),
            delta_y: Yup.number().required(),
            basebpm: Yup.number().required(),
            easing_x: Yup.string(),
            easing_b_point_x: Yup.string().transform(emptyStringToUndef),
            easing_y: Yup.string(),
            easing_b_point_y: Yup.string().transform(emptyStringToUndef),
            offset_t: Yup.number()
              .integer()
              .transform(emptyStringToUndef)
              .nullable(),
            delta_offset_t: Yup.number()
              .integer()
              .transform(emptyStringToUndef)
              .nullable(),
            easing_offset_t: Yup.string(),
            easing_b_point_offset_t: Yup.string().transform(emptyStringToUndef),
            infbpm: Yup.number().transform(emptyStringToUndef).nullable(),
            framerate: Yup.number().transform(emptyStringToUndef).nullable(),
            fake_note_t: Yup.number()
              .integer()
              .transform(emptyStringToUndef)
              .nullable(),
          }),
        }}
      >
        <CardWithGrid title="Note区域">
          <ArcField name="arc" allowMultiline />
        </CardWithGrid>

        <CardWithGrid title="参数">
          <NumberField name="params.start" withTimingCalc />
          <NumberField name="params.stop" withTimingCalc />
          <NumberField name="params.delta_x" helperText />
          <NumberField name="params.delta_y" helperText />
          <NumberField name="params.basebpm" />
          <SubtitleTypography>可选参数</SubtitleTypography>
          <BezierHint />
          <EasingModeSelect name="params.easing_x" />
          <EasingModeSelect name="params.easing_y" />
          <BezierField name="params.easing_b_point_x" />
          <BezierField name="params.easing_b_point_y" />
          <SingleLineGrid>
            <Typography>
              <Trans t={t}>
                下面的参数用于控制物件与z轴的距离（离玩家方向更远+/更近-）。
              </Trans>
            </Typography>
          </SingleLineGrid>
          <NumberField name="params.offset_t" withTimingCalc />
          <SingleLineGrid>
            <Typography>
              <Trans t={t}>
                同时，也可以借此处的设置实现物件在z轴上的平移，填写方式与在x、y轴上的控制参数相仿。
              </Trans>
            </Typography>
          </SingleLineGrid>
          <NumberField name="params.delta_offset_t" withTimingCalc />
          <EasingModeSelect name="params.easing_offset_t" />
          <BezierField name="params.easing_b_point_offset_t" />
          <SingleLineGrid>
            <Typography>
              <Trans t={t}>下面是一些个性化的设置。</Trans>
            </Typography>
          </SingleLineGrid>
          <NumberField name="params.infbpm" helperText />
          <NumberField name="params.framerate" helperText />
          <NumberField name="params.fake_note_t" helperText />
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
