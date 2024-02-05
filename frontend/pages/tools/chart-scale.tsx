import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ToolFormikForm from "@/components/ToolFormikForm";
import { AffTextField, ArcField, NumberField } from "@/components/input";
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
        initValues={{ notes: "", params: { scale: "" } }}
        validationSchema={{
          notes: Yup.string().required(),
          params: Yup.object().shape({
            scale: Yup.number(),
            standard: Yup.number()
              .integer()
              .transform(emptyStringToUndef)
              .nullable(),
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
