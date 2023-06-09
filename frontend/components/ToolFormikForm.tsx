import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";
import { CircularProgress, Fab, Stack } from "@mui/material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import toolMetas from "@/config/modules";
import { ArcToolMetadata, ResponseJson, StatusCode } from "@/utils/interfaces";

interface ToolFormikFormProps extends React.PropsWithChildren {
  initValues: any;
  validationSchema: any;
}

const ToolFormikForm: React.FC<ToolFormikFormProps> = ({
  children,
  initValues,
  validationSchema,
}) => {
  const router = useRouter();
  const { t } = useTranslation("tools");
  const pathname = `/${router.asPath.split("/").slice(-1)}`;

  const meta = toolMetas.find((tool) => tool.path === pathname);

  const formikSubmitHandler = async (
    values: any,
    actions: FormikHelpers<any>
  ) => {
    const resp = await fetch(`/api/aff${meta?.endpoint}`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    });

    try {
      if (resp.ok) {
        const jsonResp: ResponseJson = await resp.json();
        if (jsonResp.code === StatusCode.SUCCESS) {
          if (navigator.clipboard !== undefined) {
            navigator.clipboard.writeText(jsonResp.result);
            // // TODO 历史记录部分
            // if (history !== null) {
            //   setHistory([{
            //     value: JSON.stringify(values, null, 2),
            //     tool: pageId,
            //     time: Date.now()
            //   }, ...history])
            // }

            enqueueSnackbar("生成结果已复制到剪贴板", {
              variant: "success",
            });
          } else {
            console.warn(
              "[AFF Toolbox] 无法访问剪贴板，这可能是因为权限不足，浏览器过旧或页面不来自一个安全的来源。"
            );
            enqueueSnackbar("结果已生成，但是复制失败。请检查历史记录面板。", {
              variant: "warning",
            });
          }
        } else {
          if (jsonResp.code === StatusCode.NOTE_PARSE_ERR) {
            enqueueSnackbar("Note语句格式错误，请检查", {
              variant: "error",
            });
          }
        }
      } else if (resp.status === 422) {
        enqueueSnackbar("验证错误，请检查填写的数据格式", {
          variant: "error",
        });
        console.error(await resp.text());
      } else {
        enqueueSnackbar("遇到了未知错误", {
          variant: "error",
        });
        console.error("Failed Response:", await resp.text());
      }
    } catch (e) {
      enqueueSnackbar("遇到了未知错误", {
        variant: "error",
      });
      console.error("Unexpected Error:", e);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={Yup.object(validationSchema)}
      onSubmit={formikSubmitHandler}
    >
      {({ errors, touched, isSubmitting, setSubmitting }) => (
        <Form>
          <Stack spacing={2} sx={{ mb: 2 }}>
            {children}
          </Stack>

          <Fab
            variant="extended"
            type="submit"
            color="secondary"
            sx={{
              boxShadow: 2,
              position: "fixed",
              bottom: (theme) => theme.spacing(4),
              right: (theme) => theme.spacing(4),
            }}
            onClick={() => {
              const errKeys = Object.keys(errors);
              const touchedKeys = Object.keys(touched);
              if (touchedKeys.length === 0) {
                enqueueSnackbar("在提交之前...至少动点什么吧？", {
                  variant: "default",
                });
              } else if (errKeys.length !== 0) {
                enqueueSnackbar(`请检查以下字段：${errKeys.map((e) => t(`input.${e}`))}`, {
                  variant: "error",
                });
              }
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress color="inherit" size={20} sx={{ mr: 1.5 }} />
            ) : (
              <PlayArrow sx={{ mr: 1 }} />
            )}
            生成并复制
          </Fab>
        </Form>
      )}
    </Formik>
  );
};

export default ToolFormikForm;
