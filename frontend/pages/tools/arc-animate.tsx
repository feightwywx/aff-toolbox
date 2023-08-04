import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ToolFormikForm from "@/components/ToolFormikForm";
import {
  ArcEasingModeSelect,
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
import { Divider, Link, Typography } from "@mui/material";

const ToolPage: NextPage = () => {
  return (
    <ToolStack>
      <ToolTitle />

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
          <ArcField name="arc" />
        </CardWithGrid>

        <CardWithGrid title="参数">
          <NumberField name="params.start" />
          <NumberField name="params.stop" />
          <NumberField
            name="params.delta_x"
            placeholder="如果不变动，请填写0"
          />
          <NumberField
            name="params.delta_y"
            placeholder="如果不变动，请填写0"
          />
          <NumberField name="params.basebpm" />
          <SubtitleTypography>可选参数</SubtitleTypography>
          <EasingModeSelect name="params.easing_x" />
          <EasingModeSelect name="params.easing_y" />
          <SingleLineField>
            <Typography>
              下面的参数控制缓动曲线，当缓动类型为“b”时可以提供两个控制点作为参数，进行更精细的控制。
            </Typography>
            <Typography>
              控制点默认值为
              <span
                style={{
                  fontFamily: "monospace",
                  padding: "0.25em",
                  display: "inline",
                }}
              >
                0.33,0,0.67,1
              </span>
              。
            </Typography>
            <Typography>
              你可以在这个网站了解和调试贝塞尔曲线：
              <Link href="https://cubic-bezier.com">cubic-bezier.com</Link>
            </Typography>
          </SingleLineField>
          <BezierField name="params.easing_b_point_x" />
          <BezierField name="params.easing_b_point_y" />
          <SingleLineField>
            <Typography>
              下面的参数用于控制物件与z轴的距离（离玩家方向更远+/更近-）。
            </Typography>
          </SingleLineField>
          <NumberField name="params.offset_t" />
          <SingleLineField>
            <Typography>
              同时，也可以借此处的设置实现物件在z轴上的平移，填写方式与在x、y轴上的控制参数相仿。
            </Typography>
          </SingleLineField>
          <NumberField name="params.delta_offset_t" />
          <EasingModeSelect name="params.easing_offset_t" />
          <BezierField name="params.easing_b_point_offset_t" />
          <SingleLineField>
            <Typography>下面是一些个性化的设置。</Typography>
          </SingleLineField>
          <NumberField name="params.infbpm" />
          <NumberField name="params.framerate" />
          <NumberField name="params.fake_note_t" />
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
