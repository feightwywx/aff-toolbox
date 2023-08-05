import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ToolFormikForm from "@/components/ToolFormikForm";
import { ArcField, NumberField } from "@/components/input";
import { CardWithGrid, SubtitleTypography } from "@/components/CardWithGrid";
import { ToolTitle } from "@/components/ToolTitle";
import * as Yup from "yup";
import { ToolStack } from "@/components/ToolStack";
import { emptyStringToUndef } from "@/utils/helpers";

const ToolPage: NextPage = () => {
  return (
    <ToolStack>
      <ToolTitle />

      <ToolFormikForm
        initValues={{ params: { start: "", stop: "", step: "", length: "" } }}
        validationSchema={{
          params: Yup.object().shape({
            start: Yup.number().integer().required(),
            stop: Yup.number().integer().required(),
            step: Yup.number().required(),
            length: Yup.number()
              .integer()
              .transform(emptyStringToUndef)
              .nullable(),
          }),
        }}
      >
        <CardWithGrid title="参数">
          <NumberField name="params.start" />
          <NumberField name="params.stop" />
          <NumberField name="params.step" />
          <SubtitleTypography>可选参数</SubtitleTypography>
          <NumberField name="params.dropLength" helperText />
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
