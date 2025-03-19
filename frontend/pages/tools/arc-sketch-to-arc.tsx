import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ToolFormikForm from "@/components/ToolFormikForm";
import { 
    ArcField,
    NumberField,
    ImageField,
    SketchToArcMethodSelect,
    SketchToArcPlaneSelect
} from "@/components/input";
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
            img_file: null,
            start: "",
            stop: "",
            x_limit_range: "",
            y_limit_range: "",
            method: 'contour',
            plane: 'vertical',
            sampling_rate: 0.01,
            x_scale: 1,
            y_scale: 1
          },
          ...ArcPostProcessInitValues,
        }}
        validationSchema={{
          params: Yup.object().shape({
            img_file: Yup.mixed().required(),
            start: Yup.number().integer().required(),
            stop: Yup.number().integer().required(),
            method: Yup.string().required(),
            plane: Yup.string().required(),
            sampling_rate: Yup.number().required(),
            x_limit_range: Yup.string()
              .transform(emptyStringToUndef)
              .nullable(),
            y_limit_range: Yup.string()
              .transform(emptyStringToUndef)
              .nullable(),
            x_scale: Yup.number(),
            y_scale: Yup.number(),
          }),
          ...ArcPostProcessValidations,
        }}
      >
        <CardWithGrid title="参数">
          <ImageField name="params.img_file" />
          <NumberField name="params.start" withTimingCalc />
          <NumberField name="params.stop" withTimingCalc />
          <SketchToArcMethodSelect name="params.method" helperText/>
          <SketchToArcPlaneSelect name="params.plane" helperText/>
          <NumberField name="params.sampling_rate" helperText />

          <SubtitleTypography>可选参数</SubtitleTypography>
          <NumberField name="params.x_limit_range" helperText />
          <NumberField name="params.y_limit_range" helperText />
          <NumberField name="params.x_scale" helperText />
          <NumberField name="params.y_scale" helperText />
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
