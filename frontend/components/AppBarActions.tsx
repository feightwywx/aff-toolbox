import { IconButton, Menu, MenuItem } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import TranslateIcon from "@mui/icons-material/Translate";
import MoreIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { MenuItemSx } from "@/styles/sx";

export const ChangeLangButton: React.FC = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (event: React.SyntheticEvent<HTMLElement>) => {
    const { pathname, asPath, query } = router;
    // @ts-expect-error Property 'id' does not exist on type 'EventTarget'.
    router.push({ pathname, query }, asPath, { locale: event.target.id });
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="language"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <TranslateIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} sx={MenuItemSx} id="zh">
          中文
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={MenuItemSx} id="en">
          English
        </MenuItem>
      </Menu>
    </>
  );
};

export const HistoryButton: React.FC = () => {
  return (
    <>
      <IconButton
        size="large"
        aria-label="language"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        // onClick={() => setHistoryDialog(true)}
        color="inherit"
      >
        <HistoryIcon />
      </IconButton>
    </>
  );
};

export const MoreActionsButton: React.FC = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (event: React.SyntheticEvent<HTMLElement>) => {
    const { pathname, asPath, query } = router;
    // @ts-expect-error Property 'id' does not exist on type 'EventTarget'.
    router.push({ pathname, query }, asPath, { locale: event.target.id });
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} sx={MenuItemSx}>
          Arc构造工具
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={MenuItemSx}>
          时间细分计算器
        </MenuItem>
      </Menu>
    </>
  );
};
