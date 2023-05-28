import type { Theme } from "@mui/material";

export const ListItemSx = {
  borderRadius: 2,
  p: 0.5,
  pl: 2,
  mt: 0.5,
  color: (theme: Theme) => theme.palette.primary.main,
};

export const MenuItemSx = {
  borderRadius: 1,
  p: 1,
  m: 0.5,
  ml: 1,
  mr: 1,
  // TODO 考虑覆盖ripple颜色的同时保持动画
  // 可以hack掉ripple颜色 但是会导致动画出现问题
  // [`& .MuiTouchRipple-root span`]: {
  //  backgroundColor: theme.palette.primary.main
  // }
  minWidth: '100px'
};
