import { PropsWithChildren } from "react";
import { useTranslation } from "next-i18next";
import {
  AppBar as MuiAppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useRouter } from "next/router";
import {
  ChangeLangButton,
  DrawerButton,
  HistoryButton,
  MoreActionsButton,
} from "./AppBarActions";

const AppBar: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderRadius: 0,
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
        <HistoryButton disabled />
        <ChangeLangButton />
        <MoreActionsButton disabled />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
