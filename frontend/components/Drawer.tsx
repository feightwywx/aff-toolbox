import React from "react";
import { theme } from "@/utils/theme";
import { Toolbar, useMediaQuery } from "@mui/material";
import type { DrawerProps } from "@mui/material";
import { Drawer as MuiDrawer } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { toggleDrawer } from "@/utils/slices/layout";

export const drawerWidth = 240;

const Drawer: React.FC<
  Omit<DrawerProps, "content"> & { content?: never }
> = () => {
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const open = useAppSelector((state) => state.layout.drawerOpen);
  const dispatch = useAppDispatch();

  return desktop ? (
    <MuiDrawer
      variant="persistent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRightColor: theme.palette.divider,
          backgroundColor: theme.palette.background.default,
          borderRadius: 0,
        },
      }}
      anchor="left"
      open={open}
    >
      <Toolbar sx={{ mb: 1 }} />
      {/* {drawerContent} */}
    </MuiDrawer>
  ) : (
    // mobile
    <MuiDrawer
      variant="temporary"
      open={!open} // 移动端的drawer默认逻辑和桌面端相反
      onClose={() => dispatch(toggleDrawer())}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          mt: { xs: 9, sm: 10 },
          ml: 2,
          height: "70%",
          borderRadius: 4,
        },
      }}
      elevation={8}
    >
      {/* {drawerContent} */}
    </MuiDrawer>
  );
};

export default Drawer
