import * as Yup from "yup";

import { AffTextField, CheckBoxField, NumberField } from "@/components/input";
import { CardWithGrid, SubtitleTypography } from "@/components/CardWithGrid";
import type { GetStaticProps, NextPage } from "next";

import { ToolFormikForm } from "@/components/ToolFormikForm";
import { ToolStack } from "@/components/ToolStack";
import { ToolTitle } from "@/components/ToolTitle";
import { emptyStringToUndef } from "@/utils/helpers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ToolPage: NextPage = () => {
  return (
    <ToolStack>
      <ToolTitle />
      <ToolFormikForm
        initValues={{
          notes: "",
          params: { scale: "", fix_same_time_timing: false },
        }}
        validationSchema={{
          notes: Yup.string().required(),
          params: Yup.object().shape({
            scale: Yup.number(),
            standard: Yup.number()
              .integer()
              .transform(emptyStringToUndef)
              .nullable(),
            fix_same_time_timing: Yup.boolean(),
          }),
        }}
      >
        <CardWithGrid title="Note区域">
          <AffTextField name="notes" />
        </CardWithGrid>

        <CardWithGrid title="参数">
          <NumberField name="params.scale" />
          <SubtitleTypography>可选参数</SubtitleTypography>
          <NumberField name="params.standard" helperText />
          <CheckBoxField name="params.fix_same_time_timing" helperText />
        </CardWithGrid>
      </ToolFormikForm>
    </ToolStack>
  );
};

// i18n requirements
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh", ["common", "tools"])),
    },
  };
};

export default ToolPage;
