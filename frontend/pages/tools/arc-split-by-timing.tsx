import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ToolFormikForm from "@/components/ToolFormikForm";
import { AffTextField, ArcField } from "@/components/input";
import { CardWithGrid } from "@/components/CardWithGrid";
import { ToolTitle } from "@/components/ToolTitle";
import * as Yup from "yup";
import { ToolStack } from "@/components/ToolStack";

const ToolPage: NextPage = () => {
  return (
    <ToolStack>
      <ToolTitle />

      <ToolFormikForm
        initValues={{ arc: "", timings: "" }}
        validationSchema={{
          arc: Yup.string().required(),
          timings: Yup.string().required(),
        }}
      >
        <CardWithGrid title="Note区域">
          <ArcField name="arc" />
          <AffTextField
            name="timings"
            placeholder={`timing(0,222.22,4.00);\ntiming(100,222.22,4.00);\n...`}
          />
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
