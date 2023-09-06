import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ToolFormikForm from "@/components/ToolFormikForm";
import { AffTextField, NumberField, SingleLineField } from "@/components/input";
import { CardWithGrid, SubtitleTypography } from "@/components/CardWithGrid";
import { ToolTitle } from "@/components/ToolTitle";
import * as Yup from "yup";
import { ToolStack } from "@/components/ToolStack";
import { Typography } from "@mui/material";
import { emptyStringToUndef } from "@/utils/helpers";
import { useTranslation, Trans } from "next-i18next";

const ToolPage: NextPage = () => {
  const { t } = useTranslation("tools");
  return (
    <ToolStack>
      <ToolTitle>
        <Typography>
          <Trans t={t}>
            {/* prettier-ignore */}
            最小公倍数过大（例如《Fracture Ray》FTR）时算法会炸掉，这时可以对谱面中每一种分音分别对齐一次
          </Trans>
        </Typography>
      </ToolTitle>

      <ToolFormikForm
        initValues={{ notes: "", params: { bpm: "", error: "", lcd: "" } }}
        validationSchema={{
          notes: Yup.string().required(),
          params: Yup.object().shape({
            bpm: Yup.number().required(),
            error: Yup.number().required().integer(),
            lcd: Yup.number()
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
          <NumberField name="params.bpm" helperText />
          <NumberField name="params.error" withTimingCalc />
          <SubtitleTypography>可选参数</SubtitleTypography>
          <NumberField name="params.lcd" helperText />
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
