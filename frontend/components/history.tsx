import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import HistoryIcon from "@mui/icons-material/History";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ResultHistory } from "@/utils/slices/layout";
import { Trans, useTranslation } from "next-i18next";
import { enqueueSnackbar } from "notistack";

export interface HistoryCardProps {
  history: ResultHistory;
}

export const EmptyHistory: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        opacity: 0.7,
      }}
    >
      <HistoryIcon style={{ fontSize: 100 }} />
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        <Trans t={t}>人类在神圣的沉默中学会历史。</Trans>
      </Typography>
    </Box>
  );
};

export const HistoryCard: React.FC<HistoryCardProps> = ({ history }) => {
  const { t } = useTranslation();

  const copyClickHandler = () => {
    if (navigator.clipboard !== undefined) {
      navigator.clipboard.writeText(history.output);
      enqueueSnackbar(t("已复制"), {
        variant: "success",
      });
    } else {
      console.warn(
        "[AFF Toolbox] 无法访问剪贴板，这可能是因为权限不足，浏览器过旧或页面不来自一个安全的来源。"
      );
    }
  };
  return (
    <Card>
      <CardContent style={{ maxHeight: "150px", overflow: "scroll" }}>
        <Typography>
          <pre style={{ fontFamily: "inherit", margin: "inherit" }}>
            {history.output}
          </pre>
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Typography variant="subtitle2">
          {t(`tool.${history.tool}.name`)} -{" "}
          {new Date(history.time).toLocaleString()}
        </Typography>
        <Tooltip title={t("复制")}>
          <IconButton
            style={{ marginLeft: "auto" }}
            size="small"
            onClick={copyClickHandler}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};
