import React, { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";
import { CircularProgress, Fab, Stack } from "@mui/material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import { useTranslation, Trans } from "next-i18next";
import { useRouter } from "next/router";
import toolMetas from "@/config/modules";
import { ArcToolResult, ResponseJson, StatusCode } from "@/utils/interfaces";
import { ResultHistory, appendHistory } from "@/utils/slices/layout";
import { useAppDispatch } from "@/utils/hooks";

type DataProcessor = (values: unknown) => Promise<ArcToolResult>;
type FormCallback = (input: Object, result: ArcToolResult) => void;
interface ToolFormikFormProps extends React.PropsWithChildren {
  initValues: any;
  validationSchema: any;
  processorOverride?: DataProcessor;
  successCallbackOverride?: FormCallback;
  disablePreprocess?: boolean;
  disableSubmitFab?: boolean;
}

const ToolFormikForm: React.FC<ToolFormikFormProps> = ({
  children,
  initValues,
  validationSchema,
  processorOverride,
  successCallbackOverride,
  disablePreprocess,
  disableSubmitFab,
}) => {
  const router = useRouter();
  const { t } = useTranslation("tools");
  const pathname = `/${router.asPath.split("/").slice(-1)}`;
  const dispatch = useAppDispatch();

  const meta = toolMetas.find((tool) => tool.path === pathname);

  const writeHistoryAndCopy = (value: ResultHistory) => {
    // 写入历史记录
    dispatch(appendHistory(value));

    if (navigator.clipboard !== undefined) {
      navigator.clipboard.writeText(value.output);
      enqueueSnackbar(t("生成结果已复制到剪贴板"), {
        variant: "success",
      });
    } else {
      console.warn(
        "[AFF Toolbox] 无法访问剪贴板，这可能是因为权限不足，浏览器过旧或页面不来自一个安全的来源。"
      );
      enqueueSnackbar(t("结果已生成，但是复制失败。请检查历史记录面板。"), {
        variant: "warning",
      });
    }
  };

  const remoteProcessor: DataProcessor = async (values) => {
    try {
      const resp = await fetch(`/api/aff${meta?.endpoint}`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      });
      if (resp.ok) {
        const jsonResp: ResponseJson = await resp.json();
        return jsonResp;
      } else if (resp.status === 422) {
        const errText = await resp.text();
        console.error(errText);
        return {
          code: StatusCode.REQUEST_VALIDATION_ERR,
          result: errText,
        };
      } else {
        const errText = await resp.text();
        console.error(errText);
        return {
          code: StatusCode.UNKNOWN_ERR,
          result: errText,
        };
      }
    } catch (e) {
      if ((e as Error).message.includes("Failed to fetch")) {
        return {
          code: StatusCode.NETWORK_ERR,
          result: e,
        };
      } else {
        return {
          code: StatusCode.UNKNOWN_ERR,
          result: e,
        };
      }
    }
  };

  const pageToolCallback: FormCallback = async (
    input: Object,
    result: ArcToolResult
  ) => {
    writeHistoryAndCopy({
      tool: meta?.id ?? "unknown",
      time: Date.now(),
      input,
      output: result.result,
    });
  };

  const process: DataProcessor = processorOverride ?? remoteProcessor;
  const callback: FormCallback = successCallbackOverride ?? pageToolCallback;

  const formikSubmitHandler = async (
    values: any,
    actions: FormikHelpers<any>
  ) => {
    // 预处理表单数据
    if (!disablePreprocess && values.params) {
      for (const key in values.params) {
        // 参数名包含以下关键字时，表示用逗号分隔的列表
        // TODO 用一种更优雅的方式实现识别
        if (
          key.includes("b_point") ||
          key.includes("breakpoint") ||
          key.includes("limit_range")
        ) {
          values.params[key] = (values.params[key] as string)
            .split(",")
            .map((x: string) => +x);
        }
      }
    }
    setResultContent(JSON.stringify(values));

    const result = await process(values);

    switch (result.code) {
      case StatusCode.SUCCESS: {
        callback(values, result);
        break;
      }
      case StatusCode.NOTE_PARSE_ERR: {
        enqueueSnackbar(t("Note语句格式错误，请检查"), {
          variant: "error",
        });
        break;
      }
      case StatusCode.REQUEST_VALIDATION_ERR: {
        enqueueSnackbar(t("验证错误，请检查填写的数据格式"), {
          variant: "error",
        });
        break;
      }
      case StatusCode.NETWORK_ERR: {
        enqueueSnackbar(t("请检查网络连接"), {
          variant: "error",
        });
        break;
      }
      case StatusCode.UNKNOWN_ERR:
      default: {
        enqueueSnackbar(t("遇到了未知错误"), {
          variant: "error",
        });
      }
    }

    actions.setSubmitting(false);
  };

  const [resultContent, setResultContent] = useState("");

  return (
    <Formik
      initialValues={initValues}
      validationSchema={Yup.object(validationSchema)}
      onSubmit={formikSubmitHandler}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Stack spacing={2} sx={{ mb: 2 }}>
            {children}
          </Stack>
          {!disableSubmitFab && (
            <Fab
              variant="extended"
              type="submit"
              color="secondary"
              sx={{
                boxShadow: 2,
                position: "fixed",
                bottom: (theme) => theme.spacing(4),
                right: (theme) => theme.spacing(4),
                textTransform: "none",
              }}
              onClick={() => {
                const errKeys = Object.keys(errors);
                const touchedKeys = Object.keys(touched);
                if (touchedKeys.length === 0) {
                  enqueueSnackbar(t("在提交之前...至少动点什么吧？"), {
                    variant: "default",
                  });
                } else if (errKeys.length !== 0) {
                  if (enqueueSnackbar) {
                    enqueueSnackbar(
                      `${t("请检查以下字段：")}${errKeys.map((e) =>
                        t(`input.${e}`)
                      )}`,
                      {
                        variant: "error",
                      }
                    );
                  } else {
                    setResultContent(JSON.stringify(errKeys));
                  }
                }
              }}
              disabled={isSubmitting}
              aria-label="submit"
            >
              {isSubmitting ? (
                <CircularProgress color="inherit" size={20} sx={{ mr: 1.5 }} />
              ) : (
                <PlayArrow sx={{ mr: 1 }} />
              )}
              <Trans t={t}>生成并复制</Trans>
            </Fab>
          )}
          {/* for test propose */}
          <p style={{ display: "none" }} data-testid="result">
            {resultContent}
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default ToolFormikForm;
