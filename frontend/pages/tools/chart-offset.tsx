import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ToolFormikForm from "@/components/ToolFormikForm";
import { AffTextField, NumberField } from "@/components/input";
import { CardWithGrid } from "@/components/CardWithGrid";
import { ToolTitle } from "@/components/ToolTitle";
import * as Yup from "yup";
import { ToolStack } from "@/components/ToolStack";

const ToolPage: NextPage = () => {
  return (
    <ToolStack>
      <ToolTitle />

      <ToolFormikForm
        initValues={{ notes: "", params: { offset: "" } }}
        validationSchema={{
          notes: Yup.string().required(),
          params: Yup.object().shape({
            offset: Yup.number().required().integer(),
          }),
        }}
      >
        <CardWithGrid title="Note区域">
          <AffTextField name="notes" />
        </CardWithGrid>

        <CardWithGrid title="参数">
          <NumberField name="params.offset" withTimingCalc />
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
