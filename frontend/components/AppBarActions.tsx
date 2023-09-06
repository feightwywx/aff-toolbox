import {
  Box,
  ButtonProps,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HistoryIcon from "@mui/icons-material/History";
import TranslateIcon from "@mui/icons-material/Translate";
import MoreIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Trans, useTranslation } from "next-i18next";
import { MenuItemSx } from "@/styles/sx";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { toggleDrawer } from "@/utils/slices/layout";
import { EmptyHistory, HistoryCard } from "./history";

export const DrawerButton: React.FC<ButtonProps> = ({ ...props }) => {
  const dispatch = useAppDispatch();

  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
      onClick={() => dispatch(toggleDrawer())}
      {...props}
    >
      <MenuIcon />
    </IconButton>
  );
};

export const ChangeLangButton: React.FC<ButtonProps> = ({ ...props }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (event: React.SyntheticEvent<HTMLElement>) => {
    const { pathname, asPath, query } = router;
    // @ts-expect-error Property 'id' does not exist on type 'EventTarget'.
    if (event.target.id) {
      // @ts-expect-error Property 'id' does not exist on type 'EventTarget'.
      router.push({ pathname, query }, asPath, { locale: event.target.id });
    }
    
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
        {...props}
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

export const HistoryButton: React.FC<ButtonProps> = ({ ...props }) => {
  const [historyDialog, setHistoryDialog] = useState(false);
  const resultHistory = useAppSelector((state) => state.layout.history);
  const { t } = useTranslation();

  return (
    <>
      <IconButton
        size="large"
        aria-label="language"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={() => setHistoryDialog(true)}
        color="inherit"
        {...props}
      >
        <HistoryIcon />
      </IconButton>
      <Dialog
        open={historyDialog}
        onClose={() => {
          setHistoryDialog(false);
        }}
        fullWidth
        maxWidth="lg"
      >
        <Toolbar style={{ paddingLeft: 0, display: "flex" }}>
          <DialogTitle>
            <Trans t={t}>历史记录</Trans>
          </DialogTitle>
          <div style={{ flexGrow: 1 }}></div>
          <IconButton onClick={() => setHistoryDialog(false)}>
            <CloseIcon />
          </IconButton>
        </Toolbar>

        <DialogContent
          style={{ height: "80vh", display: "flex", overflow: "scroll" }}
        >
          {resultHistory && resultHistory.length > 0 ? (
            <Stack
              style={{ width: "100%", height: "fit-content" }}
              direction="column"
              spacing={1}
            >
              {resultHistory.map((x, i) => (
                <HistoryCard history={x} key={i} />
              ))}
            </Stack>
          ) : (
            <EmptyHistory />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export const MoreActionsButton: React.FC<ButtonProps> = ({ ...props }) => {
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
        {...props}
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
