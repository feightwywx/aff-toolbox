import {
  Badge,
  Box,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ChangeLangButton,
  DrawerButton,
  HistoryButton,
  ToggleThemeButton,
} from "./AppBarActions";

import type React from "react";
import { computeDarkMode } from "@/utils/helpers";
import { useAppSelector } from "@/utils/hooks";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "next-i18next";

const AppBar: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation();

  const configuredDarkMode = useAppSelector((state) => state.layout.darkMode);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const darkMode = computeDarkMode(configuredDarkMode, prefersDarkMode);

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderRadius: 0,
        backgroundColor: (theme) =>
          darkMode ? theme.palette.primary.light : theme.palette.primary.main,
        color: (theme) =>
          darkMode
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
          <Badge
            badgeContent={"dev"}
            color="secondary"
            invisible={
              !(
                process.env.NEXT_PUBLIC_ATB_VERSION?.includes("pr") ||
                process.env.NEXT_PUBLIC_ATB_VERSION?.includes("beta")
              )
            }
          >
            <Typography variant="h6" component="div" sx={{ pr: 2 }}>
              {t("title")}
            </Typography>
          </Badge>
        </Box>

        {/* 功能按钮 */}
        <ToggleThemeButton />
        <ChangeLangButton />
        <HistoryButton />
        {/* <MoreActionsButton disabled /> */}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
