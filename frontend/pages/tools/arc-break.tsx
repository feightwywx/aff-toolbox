import * as Yup from "yup";

import { ArcField, BreakpointsField, NumberField } from "@/components/input";
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
        initValues={{
          arc: "",
          params: {
            breakpoints: "",
            disp: "",
          },
          ...ArcPostProcessInitValues,
        }}
        validationSchema={{
          arc: Yup.string().required(),
          params: Yup.object().shape({
            breakpoints: Yup.string().required(),
            disp: Yup.number().required(),
          }),
          ...ArcPostProcessValidations,
        }}
      >
        <CardWithGrid title="Note区域">
          <ArcField name="arc" allowMultiline />
        </CardWithGrid>

        <CardWithGrid title="参数">
          <BreakpointsField name="params.breakpoints" helperText />
          <NumberField name="params.disp" helperText />
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
