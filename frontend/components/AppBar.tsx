import { PropsWithChildren } from "react";
import { useTranslation } from "next-i18next";
import {
  AppBar as MuiAppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Theme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  ChangeLangButton,
  DrawerButton,
  HistoryButton,
  MoreActionsButton,
} from "./AppBarActions";

const AppBar: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderRadius: 0,
        backgroundColor: (theme) =>
          prefersDarkMode
            ? theme.palette.primary.light
            : theme.palette.primary.main,
        color: (theme) =>
          prefersDarkMode
            ? theme.palette.primary.dark
            : theme.palette.primary.contrastText,
      }}
      elevation={0}
    >
      <Toolbar>
        {/* 汉堡菜单 */}
        <DrawerButton />

        {/* 标题 */}
        <Box sx={{ flexGrow: 1 }}>
          <Badge badgeContent={"beta"} color="secondary">
            <Typography variant="h6" component="div" sx={{ pr: 2 }}>
              {t("title")}
            </Typography>
          </Badge>
        </Box>

        {/* 功能按钮 */}
        <ChangeLangButton />
        <HistoryButton />
        {/* <MoreActionsButton disabled /> */}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
