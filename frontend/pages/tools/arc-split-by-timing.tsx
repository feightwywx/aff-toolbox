import * as Yup from "yup";

import { AffTextField, ArcField } from "@/components/input";
import {
  ArcPostProcessCard,
  ArcPostProcessInitValues,
  ArcPostProcessValidations,
} from "@/components/ArcPostProcessCard";
import type { GetStaticProps, NextPage } from "next";

import { CardWithGrid } from "@/components/CardWithGrid";
import { ToolFormikForm } from "@/components/ToolFormikForm";
import { ToolStack } from "@/components/ToolStack";
import { ToolTitle } from "@/components/ToolTitle";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ToolPage: NextPage = () => {
  return (
    <ToolStack>
      <ToolTitle />

      <ToolFormikForm
        initValues={{ arc: "", timings: "", ...ArcPostProcessInitValues }}
        validationSchema={{
          arc: Yup.string().required(),
          timings: Yup.string().required(),
          ...ArcPostProcessValidations,
        }}
      >
        <CardWithGrid title="Note区域">
          <ArcField name="arc" allowMultiline />
          <AffTextField
            name="timings"
            placeholder={`timing(0,222.22,4.00);\ntiming(100,222.22,4.00);\n...`}
          />
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
