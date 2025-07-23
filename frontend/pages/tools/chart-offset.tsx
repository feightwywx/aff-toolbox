import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ToolFormikForm from "@/components/ToolFormikForm";
import { AffTextField, CheckBoxField, NumberField } from "@/components/input";
import { CardWithGrid, SubtitleTypography } from "@/components/CardWithGrid";
import { ToolTitle } from "@/components/ToolTitle";
import * as Yup from "yup";
import { ToolStack } from "@/components/ToolStack";

const ToolPage: NextPage = () => {
  return (
    <ToolStack>
      <ToolTitle />

      <ToolFormikForm
        initValues={{
          notes: "",
          params: {
            offset: "",
            allowMinusTimingNote: false,
            process_audiooffset: false,
          },
        }}
        validationSchema={{
          notes: Yup.string().required(),
          params: Yup.object().shape({
            offset: Yup.number().required().integer(),
            allowMinusTimingNote: Yup.boolean(),
            process_audiooffset: Yup.boolean()
          }),
        }}
      >
        <CardWithGrid title="Note区域">
          <AffTextField name="notes" />
        </CardWithGrid>

        <CardWithGrid title="参数">
          <NumberField name="params.offset" withTimingCalc />
          <SubtitleTypography>可选参数</SubtitleTypography>
          <CheckBoxField name="params.allowMinusTimingNote" />
          <CheckBoxField name="params.process_audiooffset" />
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
