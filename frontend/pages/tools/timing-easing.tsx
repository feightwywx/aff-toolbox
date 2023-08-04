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
