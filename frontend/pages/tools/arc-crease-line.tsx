import * as Yup from "yup";

import {
  ArcEasingModeSelect,
  CreaseModeSelect,
} from "@/components/input/select/selects";
import { ArcField, NumberField } from "@/components/input";
import {
  ArcPostProcessCard,
  ArcPostProcessInitValues,
  ArcPostProcessValidations,
} from "@/components/ArcPostProcessCard";
import { CardWithGrid, SubtitleTypography } from "@/components/CardWithGrid";
import type { GetStaticProps, NextPage } from "next";

import { ToolFormikForm } from "@/components/ToolFormikForm";
import { ToolStack } from "@/components/ToolStack";
import { ToolTitle } from "@/components/ToolTitle";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ToolPage: NextPage = () => {
  return (
    <ToolStack>
      <ToolTitle />

      <ToolFormikForm
        initValues={{
          arc: "",
          params: {
            delta_x: "",
            delta_y: "",
            count: "",
            arc_easing: "s",
            mode: "m",
          },
          ...ArcPostProcessInitValues,
        }}
        validationSchema={{
          arc: Yup.string().required(),
          params: Yup.object().shape({
            delta_x: Yup.number().required(),
            delta_y: Yup.number().required(),
            count: Yup.number().required(),
            arc_easing: Yup.string(),
            mode: Yup.string(),
          }),
          ...ArcPostProcessValidations,
        }}
      >
        <CardWithGrid title="Note区域">
          <ArcField name="arc" allowMultiline />
        </CardWithGrid>

        <CardWithGrid title="参数">
          <NumberField name="params.delta_x" helperText />
          <NumberField name="params.delta_y" helperText />
          <NumberField name="params.count" />
          <SubtitleTypography>可选参数</SubtitleTypography>
          <ArcEasingModeSelect name="params.arc_easing" />
          <CreaseModeSelect name="params.mode" helperText />
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
