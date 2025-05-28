import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ToolFormikForm from "@/components/ToolFormikForm";
import { ArcField, NumberField } from "@/components/input";
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
          arc: "",
          params: { x_offset: "", y_offset: "" },
          ...ArcPostProcessInitValues,
        }}
        validationSchema={{
          arc: Yup.string().required(),
          params: Yup.object().shape({
            x_offset: Yup.number()
              .transform(emptyStringToUndef)
              .nullable(),
            y_offset: Yup.number()
              .transform(emptyStringToUndef)
              .nullable(),
          }),
          ...ArcPostProcessValidations
        }}
      >
        <CardWithGrid title="Note区域">
          <ArcField name="arc" allowMultiline/>
        </CardWithGrid>

        <CardWithGrid title="参数">
          <SubtitleTypography>可选参数</SubtitleTypography>
          <NumberField name="params.x_offset" />
          <NumberField name="params.y_offset" />
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
